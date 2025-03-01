import { NextResponse } from "next/server";
import { authGuard } from "@/controller/auth";
import {
  createInterest,
  fetchGivenInterests,
  getQueryParams,
  updateGivenInterest,
  validateInterestData,
} from "@/controller/interests";

/**
 * Handles GET request
 */
export async function GET(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  const params = getQueryParams(new URL(request.url));
  const { total, data } = await fetchGivenInterests(params as any);

  return NextResponse.json({
    total,
    data,
    message: "Given Interests fetched successfully",
  });
}

/**
 * Handles POST request
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationError = validateInterestData(body);
    if (validationError)
      return NextResponse.json(
        { error: validationError.error },
        { status: 400 }
      );

    const result: any = await createInterest(body);
    if (result.error)
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );

    return NextResponse.json(
      { data: result, description: "Interest created successfully." },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating interest:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "A similar interest record already exists. Please check your input.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, isAccepted } = body;

    const result = await updateGivenInterest(id, isAccepted);
    return NextResponse.json(result, { status: result.status });
  } catch (error: any) {
    console.error("Error updating interest:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
