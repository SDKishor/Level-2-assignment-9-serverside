import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "../../../generated/prisma";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();

const createPost = async (postdata: any) => {
  const { title, content, authorId, location, price, image } = postdata;

  const res = await prisma.$transaction(async (prisma) => {
    const category = await prisma.catagory.upsert({
      where: { name: postdata.category },
      update: {},
      create: { name: postdata.category },
    });

    return await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        location,
        price,
        image,
        Catagory: {
          connect: { id: category.id },
        },
      },
    });
  });

  return res;
};

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      Catagory: true,
    },
  });
  if (!posts) {
    throw new AppError("No posts found", StatusCodes.NOT_FOUND);
  }
  return posts;
};

const getPostByAuthor = async (authorId: string) => {
  const posts = await prisma.post.findMany({
    where: { authorId },
    include: {
      Catagory: true,
    },
  });
  if (!posts) {
    throw new AppError("No posts found", StatusCodes.NOT_FOUND);
  }
  return posts;
};

const getPostById = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      Catagory: true,
    },
  });
  if (!post) {
    throw new AppError("Post not found", StatusCodes.NOT_FOUND);
  }
  return post;
};

const getPostsByCategory = async (categoryId: string) => {
  const posts = await prisma.catagory.findMany({
    where: { id: categoryId },
    include: {
      Post: true,
    },
  });
  if (!posts) {
    throw new AppError("No posts found", StatusCodes.NOT_FOUND);
  }
  return posts;
};

const updatePost = async (postId: string, postdata: any) => {
  //check if post exist
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new AppError("Post not found", StatusCodes.NOT_FOUND);
  }

  const res = await prisma.post.update({
    where: { id: postId },
    data: postdata,
  });

  return res;
};

const deletePost = async (postId: string) => {
  //check if post exist
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new AppError("Post not found", StatusCodes.NOT_FOUND);
  }
  const res = await prisma.post.delete({ where: { id: postId } });
  return res;
};

const approvePost = async (postId: string) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new AppError("Post not found", StatusCodes.NOT_FOUND);
  }
  const res = await prisma.post.update({
    where: { id: postId },
    data: { status: "APPROVED" },
  });
  return res;
};

const rejectPost = async (postId: string) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new AppError("Post not found", StatusCodes.NOT_FOUND);
  }
  const res = await prisma.post.update({
    where: { id: postId },
    data: { status: "REJECTED" },
  });
  return res;
};

const toggleIsPremiumPost = async (postId: string) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new AppError("Post not found", StatusCodes.NOT_FOUND);
  }
  const res = await prisma.post.update({
    where: { id: postId },
    data: { isPremiumPost: !post.isPremiumPost },
  });
  return res;
};

export const postService = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostByAuthor,
  getPostsByCategory,
  approvePost,
  rejectPost,
  toggleIsPremiumPost,
};
