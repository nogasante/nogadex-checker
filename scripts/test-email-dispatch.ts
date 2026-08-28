import { prisma } from "../lib/prisma";
import { sendResultEmail } from "../lib/email/sender";
import fs from "fs";
import path from "path";

async function testEmailDispatch() {
  console.log("-----------------------------------------------");
  console.log("📧 TESTING RESEND EMAIL DISPATCH TO c.ninja2007@gmail.com");
  console.log("-----------------------------------------------");

  // Create or update test request
  let testReq = await prisma.resultRequest.findFirst({
    where: { email: "c.ninja2007@gmail.com" }
  });

  const pdfPath = path.join(process.cwd(), "storage", "pdfs", "NGX-522158.pdf");
  if (!fs.existsSync(pdfPath)) {
    console.error("❌ PDF file not found at:", pdfPath);
    return;
  }

  if (!testReq) {
    testReq = await prisma.resultRequest.create({
      data: {
        requestId: "NGX-774920",
        fullName: "Nana Kwame Asante",
        indexNumber: "0010203040",
        dateOfBirth: "2005-08-15",
        examType: "WASSCE",
        examYear: "2025",
        email: "c.ninja2007@gmail.com",
        paymentStatus: "PAID",
        paymentAmount: 30.00,
        processingStatus: "PDF_UPLOADED",
        pdfPath: pdfPath,
        pdfFilename: "NGX-774920-Nana-Kwame-Asante-WAEC-Result.pdf",
        pdfFileSize: fs.statSync(pdfPath).size,
        pdfUploadedAt: new Date()
      }
    });
    console.log("Created test request:", testReq.requestId);
  } else {
    testReq = await prisma.resultRequest.update({
      where: { id: testReq.id },
      data: {
        pdfPath: pdfPath,
        pdfFilename: "NGX-774920-Nana-Kwame-Asante-WAEC-Result.pdf",
        pdfFileSize: fs.statSync(pdfPath).size,
        pdfUploadedAt: new Date()
      }
    });
    console.log("Updated test request:", testReq.requestId);
  }

  // Dispatch email
  console.log("Sending result email via Resend...");
  const result = await sendResultEmail({
    toEmail: "c.ninja2007@gmail.com",
    pdfPath: testReq.pdfPath!,
    pdfFilename: testReq.pdfFilename!,
    data: {
      studentName: testReq.fullName,
      requestId: testReq.requestId,
      indexNumber: testReq.indexNumber,
      examType: testReq.examType,
      examYear: testReq.examYear,
      supportPhone: "233534908166"
    }
  });

  console.log("Email Dispatch Result:", JSON.stringify(result, null, 2));
}

testEmailDispatch().catch(console.error);
