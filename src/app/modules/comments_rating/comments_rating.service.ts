import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

const createUser = async (userdata: { email: string; password: string }) => {
  const { email, password } = userdata;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new AppError("User already exists", StatusCodes.BAD_REQUEST);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
};

const loginUser = async (email: string, password: string) => {
  // Find the user by email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
  }

  // Compare the password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
  }

  // Generate JWT token
  const accessToken = generateToken(
    user.id,
    user.role,
    user.email,
    user.isPremiumUser
  );

  return { accessToken };
};

const blockUser = async (id: string) => {
  // Find the user by ID
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  // Block the user
  const blockedUser = await prisma.user.update({
    where: { id },
    data: { isBlocked: true },
  });

  return blockedUser;
};

const unBlockUser = async (id: string) => {
  // Find the user by ID
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  // Block the user
  const blockedUser = await prisma.user.update({
    where: { id },
    data: { isBlocked: false },
  });

  return blockedUser;
};

export const authService = {
  createUser,
  loginUser,
  blockUser,
  unBlockUser,
};
