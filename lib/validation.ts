import { z } from "zod";

export const EXAM_TYPES = [
  { value: "WASSCE", label: "WASSCE (School Candidates)" },
  { value: "NOVDEC", label: "WASSCE (Private Candidates / NOVDEC)" },
  { value: "BECE_SCHOOL", label: "BECE (School Candidates)" },
  { value: "BECE_PRIVATE", label: "BECE (Private Candidates)" },
  { value: "GBCE", label: "General Business Certificate Exam (GBCE)" },
  { value: "ABCE", label: "Advanced Business Certificate Exam (ABCE)" },
] as const;

export const StudentSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name is too long"),
  indexNumber: z
    .string()
    .trim()
    .min(6, "Index number must be at least 6 characters")
    .max(15, "Index number must be under 15 characters")
    .regex(/^[A-Za-z0-9]+$/, "Index number can only contain letters and numbers"),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Date of birth is required")
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of birth must be in YYYY-MM-DD format"
    ),
  examType: z.enum(
    ["WASSCE", "NOVDEC", "BECE_SCHOOL", "BECE_PRIVATE", "GBCE", "ABCE", "BECE"],
    { message: "Please select a valid examination type" }
  ),
  examYear: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Examination year must be a 4-digit year")
    .refine((year) => {
      const y = parseInt(year, 10);
      const currentYear = new Date().getFullYear();
      return y >= 1990 && y <= currentYear + 1;
    }, "Please enter a valid examination year (1990 to current)"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address where your PDF result will be sent")
    .toLowerCase(),
  whatsappNumber: z
    .string()
    .trim()
    .min(9, "WhatsApp number is required so we can reach you if details need clarification")
    .max(20, "WhatsApp number is too long")
    .regex(/^\+?[0-9\s\-()]{9,20}$/, "Please enter a valid WhatsApp number (e.g. 054 123 4567)"),
});

export type StudentSubmissionInput = z.infer<typeof StudentSubmissionSchema>;

export const AdminLoginSchema = z.object({
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
