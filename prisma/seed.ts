import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "AdminPassword2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const adminEmails = [
    { email: "admin@nogadex.com", name: "Nogadex Administrator" },
    { email: "nanasante2000@gmail.com", name: "Nana Asante" },
    { email: "nogasante@st.knust.edu.gh", name: "Nana Asante (KNUST)" },
  ];

  for (const a of adminEmails) {
    const admin = await prisma.user.upsert({
      where: { email: a.email },
      update: { passwordHash },
      create: {
        email: a.email,
        name: a.name,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`✅ Admin account configured: ${admin.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
