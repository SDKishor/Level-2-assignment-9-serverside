import config from "../config";
import AppError from "./AppError";
import { TErrorSources } from "./error.interface";
import handleDuplicateError from "./handleDuplicateError";
import { ErrorRequestHandler } from "express";

const globalErrorHandeler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "",
    },
  ];

  if (err?.name === "PrismaClientValidationError") {
    statusCode = 400;
    message = err?.name;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err?.name === "PrismaClientKnownRequestError") {
    statusCode = 400;
    message = err?.name;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandeler;
