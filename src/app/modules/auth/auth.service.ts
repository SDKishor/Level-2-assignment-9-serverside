import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";

const createUser = async (user: IUser) => {};

const loginUser = async (email: string, password: string) => {};

export const authService = {
  createUser,
  loginUser,
};
