import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router.post("/create", categoryController.createCategory);

router.get("/", categoryController.getAllCategories);

router.delete("/:id", categoryController.deleteCategory);

export const CategoryRoutes = router;
