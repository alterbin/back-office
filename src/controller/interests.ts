import prisma from "@/lib/prisma";
import { GetRequest } from "@/services/queries/givens/types";
import { Prisma } from "@prisma/client";

/**
 * Parses query parameters for pagination and search
 */

export function getQueryParams(url: URL) {
  return {
    page: parseInt(url.searchParams.get("page") || "1", 10),
    take: parseInt(url.searchParams.get("take") || "10", 10),
    order: url.searchParams.get("order") === "asc" ? "asc" : "desc",
    search: url.searchParams.get("search") || "",
    fromDate: url.searchParams.get("fromDate") || "",
    toDate: url.searchParams.get("toDate") || "",
    given: url.searchParams.get("given") || "",
  };
}

/**
 * Builds the Prisma `where` filter for search
 */
function buildWhereClause(
  search: string,
  fromDate: string,
  toDate: string
): Prisma.given_interestsWhereInput {
  return {
    ...(search
      ? {
          OR: [
            { note: { contains: search, mode: "insensitive" } },
            { contact: { contains: search, mode: "insensitive" } },
            { shippingAddress: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(fromDate || toDate
      ? {
          createdAt: {
            ...(fromDate ? { gte: new Date(fromDate) } : {}),
            ...(toDate ? { lte: new Date(toDate) } : {}),
          },
        }
      : {}),
  };
}

/**
 * Fetches given interests with filtering and pagination
 */
export async function fetchGivenInterests(params: GetRequest) {
  const { page, take, order, search, toDate, fromDate, given } = params;
  const skip = (page - 1) * take;
  const where: Prisma.given_interestsWhereInput = {
    ...(search
      ? {
          OR: [
            { note: { contains: search, mode: "insensitive" } },
            { contact: { contains: search, mode: "insensitive" } },
            { shippingAddress: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(fromDate || toDate
      ? {
          createdAt: {
            ...(fromDate ? { gte: new Date(fromDate) } : {}),
            ...(toDate ? { lte: new Date(toDate) } : {}),
          },
        }
      : {}),
    ...(given ? { givenId: given } : {}),
  };

  const [total, data] = await Promise.all([
    prisma.given_interests.count({ where }),
    prisma.given_interests.findMany({
      where,
      skip,
      take,
      orderBy: { note: order },
      include: {
        givens: true,
      },
    }),
  ]);

  return { total, data };
}

/**
 * Validates request data for creating an interest
 */
export function validateInterestData(body: any) {
  const { note, shippingAddress, contact, givenId } = body;

  if (!note || typeof note !== "string" || note.trim() === "") {
    return {
      error: "Invalid or missing 'note'. It must be a non-empty string.",
    };
  }

  if (
    !shippingAddress ||
    typeof shippingAddress !== "string" ||
    shippingAddress.trim() === ""
  ) {
    return {
      error:
        "Invalid or missing 'shippingAddress'. It must be a non-empty string.",
    };
  }

  if (!contact || typeof contact !== "string" || contact.trim() === "") {
    return {
      error: "Invalid or missing 'contact'. It must be a non-empty string.",
    };
  }

  if (!givenId || typeof givenId !== "string") {
    return {
      error: "Invalid or missing 'givenId'. It must be a valid UUID string.",
    };
  }

  return null;
}

/**
 * Creates a new interest record
 */
export async function createInterest(data: {
  note: string;
  shippingAddress: string;
  contact: string;
  givenId: string;
}) {
  const { note, shippingAddress, contact, givenId } = data;

  const givingExists = await prisma.given_interests.findUnique({
    where: { id: givenId },
  });

  if (!givingExists) {
    return { error: "The specified 'givenId' does not exist.", status: 404 };
  }

  const alreadyAppliedUser = await prisma.given_interests.findFirst({
    where: { contact, givenId },
  });

  if (alreadyAppliedUser) {
    return {
      error: "You have applied before, kindly wait till we finish review.",
      status: 409,
    };
  }

  return await prisma.given_interests.create({
    data: {
      note: note.trim(),
      shippingAddress: shippingAddress.trim(),
      contact: contact.trim(),
      givenId,
    },
  });
}

export async function updateGivenInterest(id: string, isAccepted: boolean) {
  if (!id || typeof id !== "string") {
    return { error: "Invalid or missing 'id'.", status: 400 };
  }

  // Find the interest record
  const interest = await prisma.given_interests.findUnique({
    where: { id },
    select: { givenId: true, isAccepted: true },
  });

  if (!interest) {
    return { error: "Interest record not found.", status: 404 };
  }

  // Check if another interest for this given is already accepted
  if (isAccepted === true) {
    const existingAcceptedInterest = await prisma.given_interests.findFirst({
      where: { givenId: interest.givenId, isAccepted: true },
    });

    if (existingAcceptedInterest && existingAcceptedInterest.id !== id) {
      return {
        message: "An interest has already been accepted for this given.",
        status: 409,
      };
    }
  }

  // Update the interest
  const updatedInterest = await prisma.given_interests.update({
    where: { id },
    data: { isAccepted },
  });

  // If isAccepted is changed to true, update the related given record
  if (isAccepted === true) {
    await prisma.givens.update({
      where: { id: interest.givenId },
      data: { isFulfilled: true },
    });
  } else {
    // Check if there are any remaining accepted interests for this given
    const remainingAccepted = await prisma.given_interests.findFirst({
      where: { givenId: interest.givenId, isAccepted: true },
    });

    // If no accepted interests remain, set isFulfilled to false
    if (!remainingAccepted) {
      await prisma.givens.update({
        where: { id: interest.givenId },
        data: { isFulfilled: false },
      });
    }
  }

  return { data: updatedInterest, status: 200 };
}
