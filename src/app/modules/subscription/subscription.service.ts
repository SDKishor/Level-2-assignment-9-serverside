import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "../../../generated/prisma";
import AppError from "../../errors/AppError";
import { orderUtils } from "./subscription.utils";

const prisma = new PrismaClient();

const subscriptionToPremium = async (orderData: any) => {
  const shurjopayPayload = {
    amount: orderData.amount,
    order_id: orderData.order_id,
    currency: "BDT",
    customer_name: orderData.customer_name,
    customer_address: orderData.customer_address,
    customer_email: orderData.email,
    customer_phone: orderData.customer_phone,
    customer_city: orderData.customer_city,
    client_ip: "127.0.0.1",
  };
  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (!payment) {
    throw new AppError("Failed to create order2", StatusCodes.BAD_REQUEST);
  }

  const addToDB = await prisma.subscription.create({
    data: {
      userId: orderData.userId,
      customer_order_id: payment.customer_order_id,
      sp_order_id: payment.sp_order_id,
      transactionStatus: payment.transactionStatus,
    },
  });

  return payment;
};

const verifyPayment = async (order_id: string, email: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (!verifiedPayment) {
    throw new AppError("Failed to verify payment", StatusCodes.BAD_REQUEST);
  }

  if (Number(verifiedPayment[0].sp_code) !== 1000) {
    await prisma.subscription.delete({
      where: { sp_order_id: verifiedPayment[0].order_id },
    });

    return "Payment failed";
  }

  return await prisma.$transaction(async (prisma) => {
    // 1. Handle failed payment case

    // 2. Update subscription (success case)
    await prisma.subscription.update({
      where: { sp_order_id: verifiedPayment[0].order_id },
      data: { transactionStatus: "Success" },
    });

    // 3. Upgrade user to premium
    await prisma.user.update({
      where: { email: email },
      data: { isPremiumUser: true },
    });

    return verifiedPayment;
  });
};

export const subscriptionService = {
  subscriptionToPremium,
  verifyPayment,
};
