import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userUpvoteService } from "./user_vote.service";

const createOrUpdateUserUpvote = catchAsync(async (req, res) => {
  const { userId, postId, upVote } = req.body;

  const result = await userUpvoteService.createOrUpdateUserUpvote({
    userId,
    postId,
    upVote,
  });

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "User vote not found",
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User vote updated successfully",
    data: result,
  });
});

export const userUpvoteController = {
  createOrUpdateUserUpvote,
};
