import { Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/create", postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.get("/author/:id", postController.getPostByAuthor);
router.get("/category/:categoryId", postController.getPostsByCategory);
router.put("/update/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

router.put("/status/approve/:id", auth("ADMIN"), postController.approvePost);
router.put("/status/reject/:id", auth("ADMIN"), postController.rejectPost);

router.put(
  "/status/premium/:id",
  auth("ADMIN"),
  postController.toggleIsPremiumPost
);

export const PostRoutes = router;
