import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ratingService } from "./rating.service";

const createRating = catchAsync(async (req, res) => {
  const { userId, postId, rating } = req.body;
  const result = await ratingService.createRating({
    userId,
    postId,
    rating,
  });

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to create rating",
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Rating created successfully",
    data: result,
  });
});

export const ratingController = {
  createRating,
};
