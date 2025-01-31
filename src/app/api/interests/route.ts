import { error } from "console";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { authGuard } from "@/controller/auth";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const take = parseInt(url.searchParams.get("take") || "10", 10);
  const order = url.searchParams.get("order") === "asc" ? "asc" : "desc";
  const search = url.searchParams.get("search") || "";
  const skip = (page - 1) * take;

  const where: Prisma.given_interestsWhereInput = search
    ? {
        OR: [
          { note: { contains: search, mode: "insensitive" } },
          { contact: { contains: search, mode: "insensitive" } },
          { shippingAddress: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [total, data] = await Promise.all([
    prisma.given_interests.count({ where }),
    prisma.given_interests.findMany({
      where,
      skip,
      take,
      orderBy: { note: order },
    }),
  ]);
  return NextResponse.json({
    total,
    data,
    message: "Given Interests fetched successfully",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { note, shippingAddress, contact, givenId } = body;

    // Validate required fields
    if (!note || typeof note !== "string" || note.trim() === "") {
      return NextResponse.json(
        { error: "Invalid or missing 'note'. It must be a non-empty string." },
        { status: 400 }
      );
    }

    if (
      !shippingAddress ||
      typeof shippingAddress !== "string" ||
      shippingAddress.trim() === ""
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid or missing 'shippingAddress'. It must be a non-empty string.",
        },
        { status: 400 }
      );
    }

    if (!contact || typeof contact !== "string" || contact.trim() === "") {
      return NextResponse.json(
        {
          error: "Invalid or missing 'contact'. It must be a non-empty string.",
        },
        { status: 400 }
      );
    }

    if (!givenId || typeof givenId !== "string") {
      return NextResponse.json(
        {
          response: {
            message:
              "Invalid or missing 'givenId'. It must be a valid UUID string.",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    // Check if the associated Given record exists
    const givingExists = await prisma.given_interests.findUnique({
      where: { id: givenId },
    });

    if (!givingExists) {
      return NextResponse.json(
        {
          response: {
            message: "The specified 'givenId' does not exist.",
            status: 404,
          },
        },
        { status: 404 }
      );
    }

    //check if contact has shown interest before
    const alreadyAppliedUser = await prisma.given_interests.findFirst({
      where: {
        contact: contact,
        givenId: givenId,
      },
    });

    if (alreadyAppliedUser && givingExists) {
      return NextResponse.json(
        {
          response: {
            message:
              "You have applied before, kindly wait till we fininsh review",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    // Create the Interest record
    const interest = await prisma.given_interests.create({
      data: {
        note: note.trim(),
        shippingAddress: shippingAddress.trim(),
        contact: contact.trim(),
        givenId,
      },
    });

    return NextResponse.json(
      {
        data: interest,
        description: "Interest created successfully.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating interest:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          response: {
            message:
              "A similar interest record already exists. Please check your input.",
            status: 409,
          },
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        response: {
          message:
            "An unexpected error occurred while processing your request.",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
}
