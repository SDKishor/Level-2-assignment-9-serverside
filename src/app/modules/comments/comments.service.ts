import AppError from "../../errors/AppError";

import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";
import { Comment, PrismaClient } from "../../../generated/prisma";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createComment = async (data: Comment) => {
  const { comment, postId, userId } = data;
  if (!comment || !postId || !userId) {
    throw new AppError(
      "Comment, postId and userId are required",
      StatusCodes.BAD_REQUEST
    );
  }

  const result = await prisma.comment.create({
    data: {
      comment,
      postId,
      userId,
    },
  });

  return result;
};

const getAllComments = async (postId: string) => {
  if (!postId) {
    throw new AppError("PostId is required", StatusCodes.BAD_REQUEST);
  }
  const result = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  return result;
};

const updateComment = async (data: any) => {
  const { id, comment } = data;
  if (!id || !comment) {
    throw new AppError("Id and comment are required", StatusCodes.BAD_REQUEST);
  }
  const result = await prisma.comment.update({
    where: {
      id,
    },
    data: {
      comment,
    },
  });

  return result;
};

const deleteComment = async (id: string) => {
  if (!id) {
    throw new AppError("Id is required", StatusCodes.BAD_REQUEST);
  }
  const result = await prisma.comment.delete({
    where: {
      id,
    },
  });

  return result;
};

export const commentService = {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
};
