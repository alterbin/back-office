import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { CreateGivenDto, Given } from "@/services/queries/givens/types";

export async function fetchGivens(
  page: number,
  take: number,
  order: "asc" | "desc",
  search: string,
  fromDate?: string,
  toDate?: string
) {
  const skip = (page - 1) * take;

  const where: Prisma.givensWhereInput = {
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { contact: { contains: search, mode: "insensitive" } },
            { address: { contains: search, mode: "insensitive" } },
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

  const [total, data] = await Promise.all([
    prisma.givens.count({ where }),
    prisma.givens.findMany({
      where,
      skip,
      take,
      orderBy: { name: order },
      include: { _count: { select: { interests: true } } },
    }),
  ]);

  return { total, data };
}

export async function createGiven(data: CreateGivenDto) {
  return await prisma.givens.create({ data });
}

export async function updateGiven(id: string, data: Partial<Given>) {
  const existingGiven = await prisma.givens.findUnique({ where: { id } });
  if (!existingGiven) throw new Error("Invalid ID: No matching record found");

  return await prisma.givens.update({
    where: { id },
    data: {
      name: data.name ?? existingGiven.name,
      description: data.description ?? existingGiven.description,
      photos: data.photos ?? existingGiven.photos,
      address: data.address ?? existingGiven.address,
      contact: data.contact ?? existingGiven.contact,
      status: data.status ?? existingGiven.status,
      rank: data.rank ?? existingGiven.rank,
      isFulfilled: data.isFulfilled ?? existingGiven.isFulfilled,
      hidden: data.hidden ?? existingGiven.hidden,
    },
  });
}

export async function deleteGivens() {
  return await prisma.givens.deleteMany({ where: { OR: [{ name: "" }] } });
}
