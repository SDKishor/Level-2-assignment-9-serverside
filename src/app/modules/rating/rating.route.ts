import { Router } from "express";
import { ratingController } from "./rating.controller";

const router = Router();

router.post("/", ratingController.createRating);

export const ratingRoutes = router;
