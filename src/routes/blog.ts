import { Router } from "express";

import {
  GetBlogPosts,
  GetBlogPost,
  CreateBlogPost,
  DeleteBlogPost,
  UpdateBlogPost,
} from "../controller/BlogPostController";

export const blogsRouter = Router();

blogsRouter.get("/blogs", GetBlogPosts);

blogsRouter.get("/blogs/:id", GetBlogPost);

blogsRouter.post("/blogs", CreateBlogPost);

blogsRouter.put("/blogs/:id", UpdateBlogPost);

blogsRouter.delete("/blogs", DeleteBlogPost);
