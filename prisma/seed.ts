import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_INITIAL_EMAIL || "admin@nogadex.com";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "AdminPassword2026!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Nogadex Administrator",
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`✅ Default admin created: ${admin.email} (Password: ${adminPassword})`);
  } else {
    console.log(`ℹ️ Admin user ${adminEmail} already exists.`);
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
