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
  };
}

/**
 * Builds the Prisma `where` filter for search
 */
function buildWhereClause(search: string): Prisma.given_interestsWhereInput {
  return search
    ? {
        OR: [
          { note: { contains: search, mode: "insensitive" } },
          { contact: { contains: search, mode: "insensitive" } },
          { shippingAddress: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};
}

/**
 * Fetches given interests with filtering and pagination
 */
export async function fetchGivenInterests(params: GetRequest) {
  const { page, take, order, search } = params;
  const skip = (page - 1) * take;
  const where = buildWhereClause(search);

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
