import { NextResponse } from "next/server";
import { loginAdminUser } from "@/controller/auth";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({
      status: 405,
      message: "Method not allowed",
    });
  }
  try {
    const body = await req.json();

    const { token, adminUser } = await loginAdminUser(body);

    return NextResponse.json(
      {
        data: {
          profile: adminUser,
          accessToken: token,
        },
        description: "Login Successfully",
      },
      {
        status: 201,
        statusText: "Login Successfully",
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create given. Please try again.",
        message: (error as any)?.message,
      },
      { status: 400 }
    );
  }
}
