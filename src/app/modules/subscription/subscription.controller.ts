import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { subscriptionService } from "./subscription.service";

const subscriptionToPremium = catchAsync(async (req, res) => {
  const result = await subscriptionService.subscriptionToPremium(req.body);

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to create subscription",
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Subscription created successfully",
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  console.log(req.user);
  const { email } = req.user;
  const { order_id } = req.params;
  const result = await subscriptionService.verifyPayment(order_id, email);
  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to verify payment",
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment verified successfully",
    data: result,
  });
});

export const subscriptionController = {
  subscriptionToPremium,
  verifyPayment,
};
