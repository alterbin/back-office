import { Prisma } from "@prisma/client";
import prisma from "../../../lib/prisma";

import { NextResponse } from "next/server";
import { authGuard } from "@/controller/auth";

export async function GET(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const take = parseInt(url.searchParams.get("take") || "10", 10);
  const order = url.searchParams.get("order") === "asc" ? "asc" : "desc";
  const search = url.searchParams.get("search") || "";
  const skip = (page - 1) * take;

  const where: Prisma.givensWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { contact: { contains: search, mode: "insensitive" } },
          { address: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [total, data] = await Promise.all([
    prisma.givens.count({ where }),
    prisma.givens.findMany({
      where,
      skip,
      take,
      orderBy: { name: order },
      include: {
        _count: {
          select: { interests: true },
        },
      },
    }),
  ]);
  return NextResponse.json({
    total,
    data,
    message: "Givens fetched successfully",
  });
}

export async function POST(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { name, description, photos, address, contact } = body;

    const given = await prisma.givens.create({
      data: {
        name,
        description,
        photos: photos || [],
        address,
        contact,
      },
    });

    return NextResponse.json(
      {
        data: given,
        description: "Created Successfully",
      },
      {
        status: 201,
        statusText: "Post Created Successfully",
      }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create given. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  try {
    const deletedPosts = await prisma.givens.deleteMany({
      where: {
        OR: [{ name: "" }],
      },
    });

    return NextResponse.json(deletedPosts, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting posts:", error);
    return NextResponse.json(
      { error: "Failed to delete posts", details: error.message },
      { status: 500 }
    );
  }
}
