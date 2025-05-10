import { PrismaClient } from "../../../generated/prisma";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();

const createRating = async (data: any) => {
  const { userId, postId, rating } = data;

  const result = await prisma.$transaction(async (prisma) => {
    await prisma.rating.create({
      data: {
        userId,
        postId,
        rating,
      },
    });

    const avgRating = await prisma.rating.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        postId,
      },
    });

    if (!avgRating) {
      throw new AppError("Failed to calculate average rating", 500);
    }

    // update the post's ratingAvg
    return await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ratingAvg: avgRating._avg.rating!,
      },
    });
  });

  return result;
};

export const ratingService = {
  createRating,
};
