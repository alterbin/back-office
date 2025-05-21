import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authGuard } from "@/controller/auth";
import { createHash } from "crypto";
import { getPublicIdFromUrl } from "@/utils";

// POST: Create a new collection
export async function POST(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  try {
    const { title, description, images } = await request.json();

    const existingCollection = await prisma?.gallery_collections.findUnique({
      where: { title },
    });

    if (existingCollection) {
      return NextResponse.json(
        { message: "Collection title already exists" },
        { status: 400 }
      );
    }

    const collection = await prisma.gallery_collections.create({
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
    const collections = await prisma.gallery_collections.findMany();
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

    const existingCollection = await prisma?.gallery_collections.findUnique({
      where: { title },
    });

    if (existingCollection && existingCollection?.id !== id) {
      return NextResponse.json(
        { message: "Collection title already exists" },
        { status: 400 }
      );
    }

    const updatedCollection = await prisma.gallery_collections.update({
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

    // First get the collection to find its images
    const collection = await prisma.gallery_collections.findUnique({
      where: { id },
      select: { images: true },
    });

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    // Delete images from Cloudinary using our existing endpoint
    const deletePromises = collection.images.map(async (imageUrl) => {
      const publicId = getPublicIdFromUrl(imageUrl);

      const response = await fetch(
        `${request.headers.get("origin")}/api/cloudinary/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publicId }),
        }
      );

      if (!response.ok) {
        console.error(`Failed to delete image ${publicId} from Cloudinary`);
      }
    });

    // Wait for all image deletions to complete
    await Promise.all(deletePromises);

    // Delete the collection from database
    await prisma.gallery_collections.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Collection and associated images deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json(
      { error: "Failed to delete collection" },
      { status: 500 }
    );
  }
}
