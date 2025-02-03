import { NextResponse } from "next/server";
import { createAdminUser } from "@/controller/auth";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({
      status: 405,
      message: "Method not allowed",
    });
  }
  try {
    const body = await req.json();

    const adminUser = await createAdminUser(body);

    return NextResponse.json(
      {
        data: adminUser,
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
