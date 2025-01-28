import prisma from "@/lib/prisma";
import { LoginRequest } from "@/services/queries/auth/types";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export const createAdminUser = async ({ email, password }: LoginRequest) => {
  // Check if the user already exists
  const existingUser = await prisma.admin_user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Admin user already exists with this email.");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const adminUser = await prisma.admin_user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return adminUser;
};

export const loginAdminUser = async ({ email, password }: LoginRequest) => {
  const adminUser = await prisma.admin_user.findUnique({ where: { email } });

  if (!adminUser) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, adminUser.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: adminUser.id, email: adminUser.email },
    process.env.JWT_SECRET || "",
    { expiresIn: "1h" }
  );

  return { token, adminUser };
};

export async function authGuard(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid token format" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;
    (request as any).admin = decoded;
    return null;
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid or expired token" },
      { status: 403 }
    );
  }
}
