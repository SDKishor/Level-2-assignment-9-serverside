import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "../../../generated/prisma";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();
const createOrUpdateUserUpvote = async (data: any) => {
  const { userId, postId, upVote } = data;

  return prisma.$transaction(async (prisma) => {
    // 1. Check for existing vote
    const existingVote = await prisma.userVote.findUnique({
      where: { unique_post_user_vote: { userId, postId } },
    });

    if (existingVote && existingVote.upVote === upVote) {
      throw new AppError(
        `You have already voted this as ${upVote ? "UP" : "DOWN"} on this post`,
        StatusCodes.BAD_REQUEST
      );
    }

    // 2. Calculate vote changes
    let upvoteDelta = 0;
    let downvoteDelta = 0;

    if (existingVote) {
      // Reverting previous vote
      upvoteDelta -= existingVote.upVote ? 1 : 0;
      downvoteDelta -= existingVote.upVote ? 0 : 1;
    }

    // Applying new vote
    upvoteDelta += upVote ? 1 : 0;
    downvoteDelta += upVote ? 0 : 1;

    // 3. Update post votes
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        upvotes: { increment: upvoteDelta },
        downvotes: { increment: downvoteDelta },
      },
    });

    // 4. Upsert user vote
    await prisma.userVote.upsert({
      where: { unique_post_user_vote: { userId, postId } },
      create: { userId, postId, upVote },
      update: { upVote },
    });

    return updatedPost;
  });
};

export const userUpvoteService = {
  createOrUpdateUserUpvote,
};
