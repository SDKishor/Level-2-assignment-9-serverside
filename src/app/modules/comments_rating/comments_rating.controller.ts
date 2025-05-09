import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const createUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Email and password are required",
      data: null,
    });
  }

  const result = await authService.createUser({ email, password });
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to create user",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "user registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body.email, req.body.password);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Invalid email or password",
      data: null,
    });
  }

  const { accessToken } = result;
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "user logged in successfully",
    data: { token: accessToken },
  });
});

const blockUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await authService.blockUser(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "User not found",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User blocked successfully",
    data: result,
  });
});

const unBlockUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await authService.unBlockUser(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "User not found",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Unblocked successfully",
    data: result,
  });
});

export const authController = {
  createUser,
  loginUser,
  blockUser,
  unBlockUser,
};
