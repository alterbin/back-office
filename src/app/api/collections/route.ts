import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authGuard } from "@/controller/auth";

// POST: Create a new collection
export async function POST(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  try {
    const { title, description, images } = await request.json();

    const collection = await prisma.collections.create({
      data: { title, description, images },
    });

    return NextResponse.json(
      { data: collection, message: "Collection created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create collection" },
      { status: 500 }
    );
  }
}

// GET: Fetch all collections
export async function GET(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  try {
    const collections = await prisma.collections.findMany();
    return NextResponse.json({
      data: collections,
      message: "Collections fetched successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}

// PATCH: Update a collection by id
export async function PATCH(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;
  try {
    const { id, title, description, images } = await request.json();

    const updatedCollection = await prisma.collections.update({
      where: { id },
      data: { title, description, images },
    });

    return NextResponse.json({
      data: updatedCollection,
      message: "Collection updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update collection" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a collection by id
export async function DELETE(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;
  try {
    const { id } = await request.json();

    await prisma.collections.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Collection deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete collection" },
      { status: 500 }
    );
  }
}
