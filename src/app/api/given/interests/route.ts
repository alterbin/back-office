import prisma from "../../../../lib/prisma";

import { NextResponse } from "next/server";
import { authGuard } from "@/controller/auth";

export async function GET(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const givenId = url.searchParams.get("id");

  if (!givenId) {
    return NextResponse.json(
      { message: "Missing required parameter: givenId" },
      { status: 400 }
    );
  }

  const givenExists = await prisma.givens.findUnique({
    where: { id: givenId },
  });

  if (!givenExists) {
    return NextResponse.json(
      { message: "Invalid givenId: No matching record found" },
      { status: 404 }
    );
  }

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const take = parseInt(url.searchParams.get("take") || "10", 10);
  const skip = (page - 1) * take;

  const [total, data] = await Promise.all([
    prisma.given_interests.count({ where: { givenId } }),
    prisma.given_interests.findMany({
      where: { givenId },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return NextResponse.json({
    total,
    data,
    message: "Interests fetched successfully",
  });
}
