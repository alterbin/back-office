import { NextResponse } from "next/server";
import { authGuard } from "@/controller/auth";
import {
  createGiven,
  deleteGivens,
  fetchGivens,
  updateGiven,
} from "@/controller/givens";

export async function GET(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const take = parseInt(url.searchParams.get("take") || "10", 10);
  const order = url.searchParams.get("order") === "asc" ? "asc" : "desc";
  const search = url.searchParams.get("search") || "";
  const fromDate = url.searchParams.get("fromDate") || "";
  const toDate = url.searchParams.get("toDate") || "";
  const isFullfilled = url.searchParams.get("isFullfilled") || "";

  try {
    const result = await fetchGivens(
      page,
      take,
      order,
      search,
      fromDate,
      toDate,
      isFullfilled,
    );
    return NextResponse.json({
      ...result,
      message: "Givens fetched successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch givens" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const given = await createGiven(body);

    return NextResponse.json(
      {
        data: given,
        message: "Created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating given:", error);
    return NextResponse.json(
      { error: "Failed to create given" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json(
        { message: "Missing required parameter: id" },
        { status: 400 }
      );
    }

    const updatedGiven = await updateGiven(body.id, body);
    return NextResponse.json(
      { data: updatedGiven, message: "Updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update given" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const authError = await authGuard(request);
  if (authError) return authError;

  try {
    const deletedPosts = await deleteGivens();
    return NextResponse.json(deletedPosts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete posts" },
      { status: 500 }
    );
  }
}
