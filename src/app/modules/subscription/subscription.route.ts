import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", subscriptionController.subscriptionToPremium);
router.get(
  "/verify/:order_id",
  auth("USER"),
  subscriptionController.verifyPayment
);

export const subscriptionRoutes = router;
