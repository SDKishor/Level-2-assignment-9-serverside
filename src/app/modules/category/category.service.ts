import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";
import { PrismaClient } from "../../../generated/prisma";
import { get } from "http";

const prisma = new PrismaClient();

const createCategory = async (categoryData: { name: string }) => {
  const { name } = categoryData;
  const existingCategory = await prisma.catagory.findUnique({
    where: { name },
  });
  if (existingCategory) {
    throw new AppError("Category already exists", StatusCodes.BAD_REQUEST);
  }
  const category = await prisma.catagory.create({
    data: { name },
  });
  return category;
};

const getAllCategories = async () => {
  const categories = await prisma.catagory.findMany();
  if (!categories) {
    throw new AppError("No categories found", StatusCodes.NOT_FOUND);
  }
  return categories;
};

const deleteCategory = async (categoryId: string) => {
  const category = await prisma.catagory.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    throw new AppError("Category not found", StatusCodes.NOT_FOUND);
  }
  await prisma.catagory.delete({ where: { id: categoryId } });
  return { message: "Category deleted successfully" };
};

export const categoryService = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
