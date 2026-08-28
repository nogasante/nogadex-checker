import crypto from "crypto";
import { prisma } from "../lib/prisma";
import { StudentSubmissionSchema } from "../lib/validation";
import { verifyPaystackWebhookSignature } from "../lib/paystack";
import { generateWaecAutofillScript, formatCandidateSummary } from "../lib/waec-assistant";
import { hashPassword, verifyPassword, signAdminToken, verifyAdminToken } from "../lib/auth";
import { sendResultEmail } from "../lib/email/sender";
import fs from "fs";
import path from "path";

async function runAcceptanceTests() {
  console.log("==================================================");
  console.log("🧪 RUNNING NOGADEX CONSULTS ACCEPTANCE TESTS");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // 1. Validation Schema Tests
  console.log("\n--- 1. Validation Schema Tests ---");
  const validCandidate = {
    fullName: "Test Student",
    indexNumber: "1010101001",
    dateOfBirth: "2005-01-01",
    examType: "WASSCE" as const,
    examYear: "2025",
    email: "test@example.com",
    whatsappNumber: "0541234567",
  };

  const parseResult = StudentSubmissionSchema.safeParse(validCandidate);
  assert(parseResult.success, "Valid student data passes Zod schema validation");

  const invalidCandidate = {
    fullName: "",
    indexNumber: "12",
    dateOfBirth: "invalid-date",
    examType: "UNKNOWN",
    examYear: "1800",
    email: "not-an-email",
  };
  const invalidParseResult = StudentSubmissionSchema.safeParse(invalidCandidate);
  assert(!invalidParseResult.success, "Invalid student data is rejected with proper errors");

  // 2. Authentication Tests
  console.log("\n--- 2. Admin Authentication Tests ---");
  const rawPassword = "TestPassword2026!";
  const hash = await hashPassword(rawPassword);
  const isMatch = await verifyPassword(rawPassword, hash);
  const isWrongMatch = await verifyPassword("WrongPassword", hash);
  assert(isMatch && !isWrongMatch, "Bcrypt password hashing and verification");

  const adminToken = await signAdminToken({
    id: "admin-123",
    email: "admin@nogadex.com",
    name: "Admin User",
    role: "ADMIN",
  });
  const decodedSession = await verifyAdminToken(adminToken);
  assert(
    decodedSession !== null && decodedSession.email === "admin@nogadex.com",
    "JWT admin session signing and verification"
  );

  // 3. Paystack Webhook Signature & Idempotency Tests
  console.log("\n--- 3. Paystack Webhook Signature Verification ---");
  const secretKey = process.env.PAYSTACK_SECRET_KEY || "sk_test_placeholder_key_for_development";
  const mockWebhookBody = JSON.stringify({
    event: "charge.success",
    data: {
      reference: "TEST_REF_9999",
      amount: 3000,
      currency: "GHS",
      channel: "mobile_money",
    },
  });

  const validSignature = crypto
    .createHmac("sha512", secretKey)
    .update(mockWebhookBody)
    .digest("hex");

  const isValidWebhook = verifyPaystackWebhookSignature(mockWebhookBody, validSignature);
  const isInvalidWebhook = verifyPaystackWebhookSignature(mockWebhookBody, "fake_tampered_signature");
  assert(isValidWebhook, "Valid HMAC-SHA512 webhook signature accepted");
  assert(!isInvalidWebhook, "Tampered/invalid webhook signature rejected");

  // 4. WAEC Assistant Data & Script Generator Tests
  console.log("\n--- 4. WAEC Assistant Module Tests ---");
  const summary = formatCandidateSummary({
    requestId: "NGX-100123",
    fullName: "Test Student",
    indexNumber: "1010101001",
    dateOfBirth: "2005-01-01",
    examType: "WASSCE",
    examYear: "2025",
  });
  assert(summary.includes("1010101001") && summary.includes("2005-01-01"), "Candidate summary formatted properly");

  const script = generateWaecAutofillScript({
    requestId: "NGX-100123",
    fullName: "Test Student",
    indexNumber: "1010101001",
    dateOfBirth: "2005-01-01",
    examType: "WASSCE",
    examYear: "2025",
  });
  assert(script.includes("1010101001") && !script.includes("bypass"), "Autofill script generated safely without bypassing security");

  // 5. End-to-End Flow Database Lifecycle
  console.log("\n--- 5. End-to-End Request & PDF Email Flow ---");
  const testRequestId = `NGX-TEST-${Date.now().toString().slice(-6)}`;
  const testRef = `REF_TEST_${Date.now()}`;

  // Create request in DB
  const createdReq = await prisma.resultRequest.create({
    data: {
      requestId: testRequestId,
      fullName: "Test Student",
      indexNumber: "1010101001",
      dateOfBirth: "2005-01-01",
      examType: "WASSCE",
      examYear: "2025",
      email: "student.test@example.com",
      whatsappNumber: "233541234567",
      paymentReference: testRef,
      paymentAmount: 30.0,
      currency: "GHS",
      paymentStatus: "PENDING",
      processingStatus: "AWAITING_PAYMENT",
    },
  });
  assert(createdReq.requestId === testRequestId, "Request successfully created in database");

  // Simulate Payment Confirmation
  const paidReq = await prisma.resultRequest.update({
    where: { id: createdReq.id },
    data: {
      paymentStatus: "PAID",
      processingStatus: "READY_TO_PROCESS",
      paymentVerifiedAt: new Date(),
    },
  });
  assert(paidReq.paymentStatus === "PAID", "Request transitioned to PAID & READY_TO_PROCESS");

  // Create sample dummy PDF for testing
  const storageDir = path.join(process.cwd(), "storage", "pdfs");
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }
  const testPdfPath = path.join(storageDir, `${testRequestId}.pdf`);
  const samplePdfContent = Buffer.from(
    "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R >>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000010 00000 n \n0000000060 00000 n \n0000000118 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n165\n%%EOF"
  );
  fs.writeFileSync(testPdfPath, samplePdfContent);

  // Update PDF metadata
  const pdfUploadedReq = await prisma.resultRequest.update({
    where: { id: createdReq.id },
    data: {
      pdfPath: testPdfPath,
      pdfFilename: `${testRequestId}-Test-Student-WAEC-Result.pdf`,
      pdfFileSize: samplePdfContent.length,
      pdfUploadedAt: new Date(),
      processingStatus: "PDF_UPLOADED",
    },
  });
  assert(pdfUploadedReq.processingStatus === "PDF_UPLOADED", "PDF uploaded and metadata attached to request");

  // Send Email with Attachment
  const emailRes = await sendResultEmail({
    toEmail: "student.test@example.com",
    pdfPath: testPdfPath,
    pdfFilename: pdfUploadedReq.pdfFilename!,
    data: {
      studentName: pdfUploadedReq.fullName,
      requestId: pdfUploadedReq.requestId,
      indexNumber: pdfUploadedReq.indexNumber,
      examType: pdfUploadedReq.examType,
      examYear: pdfUploadedReq.examYear,
      supportPhone: "233534908166",
    },
  });
  assert(emailRes.success, `Email dispatched successfully via ${emailRes.provider}`);

  // Mark Request Completed
  const completedReq = await prisma.resultRequest.update({
    where: { id: createdReq.id },
    data: {
      emailStatus: "SENT",
      emailSentAt: new Date(),
      processingStatus: "COMPLETED",
      completedAt: new Date(),
    },
  });
  assert(completedReq.processingStatus === "COMPLETED", "Request completed end-to-end");

  // Cleanup test record
  await prisma.auditLog.deleteMany({ where: { requestId: createdReq.id } });
  await prisma.resultRequest.delete({ where: { id: createdReq.id } });
  if (fs.existsSync(testPdfPath)) {
    fs.unlinkSync(testPdfPath);
  }

  console.log("\n==================================================");
  console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runAcceptanceTests()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
