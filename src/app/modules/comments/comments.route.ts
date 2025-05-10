import { Router } from "express";
import { commentController } from "./comments.controller";

const router = Router();

router.post("/", commentController.createComment);
router.get("/:postId", commentController.getAllComments);
router.patch("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

export const commentsRoutes = router;
