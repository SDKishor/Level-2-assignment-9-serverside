import { Router } from "express";
import { userUpvoteController } from "./user_vote.controller";

const router = Router();

router.post("/", userUpvoteController.createOrUpdateUserUpvote);

export const userUpvoteRoutes = router;
