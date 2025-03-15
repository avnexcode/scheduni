import { db } from "@/server/db/prisma";
import type {
  CreateSpecializationRequest,
  UpdateSpecializationRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export const specializationRepository = {
  findAll: async (params: QueryParams) => {
    const { page, limit, search, sort, order } = params;

    const skip = (page - 1) * limit;

    const totalCount = await db.specialization.count({
      ...(search && {
        where: {
          OR: [{ name: { contains: search, mode: "insensitive" } }],
        },
      }),
    });

    const specializations = await db.specialization.findMany({
      take: limit,
      skip,
      ...(search && {
        where: {
          OR: [{ name: { contains: search, mode: "insensitive" } }],
        },
      }),
      orderBy: {
        [sort]: order,
      },
      select: {
        id: true,
        name: true,
        major: {
          select: {
            name: true,
          },
        },
      },
    });

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: specializations,
      meta: {
        total: totalCount,
        limit,
        page,
        last_page: lastPage,
      },
    };
  },

  findUniqueId: async (id: string) => {
    const specialization = await db.specialization.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        major: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return specialization;
  },

  findUniqueName: async (name: string) => {
    const specialization = await db.specialization.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        major: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return specialization;
  },

  countUniqueId: async (id: string) => {
    const specializationsLength = await db.specialization.count({
      where: { id },
    });

    return specializationsLength;
  },

  countUniqueName: async (name: string) => {
    const specializationsLength = await db.specialization.count({
      where: { name },
    });

    return specializationsLength;
  },

  insert: async (request: CreateSpecializationRequest) => {
    const specialization = await db.specialization.create({
      data: request,
      select: {
        id: true,
        name: true,
        created_at: true,
      },
    });

    return specialization;
  },

  update: async (id: string, request: UpdateSpecializationRequest) => {
    const specialization = await db.specialization.update({
      where: { id },
      data: request,
      select: {
        id: true,
        name: true,
        updated_at: true,
      },
    });

    return specialization;
  },

  delete: async (id: string) => {
    const specialization = await db.specialization.delete({
      where: { id },
      select: {
        id: true,
      },
    });

    return specialization;
  },
};
