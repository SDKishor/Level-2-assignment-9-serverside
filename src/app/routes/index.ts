import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PostRoutes } from "../modules/post/post.route";
import { CategoryRoutes } from "../modules/category/category.route";
import path from "path";
import { userUpvoteRoutes } from "../modules/user_vote/user_vote.route";
import { ratingRoutes } from "../modules/rating/rating.route";
import { commentsRoutes } from "../modules/comments/comments.route";
import { subscriptionRoutes } from "../modules/subscription/subscription.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/posts",
    route: PostRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/comments",
    route: commentsRoutes,
  },

  {
    path: "/user_vote",
    route: userUpvoteRoutes,
  },
  {
    path: "/rating",
    route: ratingRoutes,
  },
  {
    path: "/subscription",
    route: subscriptionRoutes,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
