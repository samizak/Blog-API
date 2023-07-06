import { Router } from "express";

require("dotenv").config();

import {
  GetBlogPosts,
  GetBlogPost,
  CreateBlogPost,
  DeleteBlogPost,
  UpdateBlogPost,
} from "../controller/BlogPostController";

export const blogsRouter = Router();

// Get Blog Posts
blogsRouter.get("/blogs", GetBlogPosts);
blogsRouter.get("/blogs/:id", GetBlogPost);

// Create new Blog Post
blogsRouter.post("/blogs", CreateBlogPost);

// Update Blog Post
blogsRouter.put("/blogs/:id", UpdateBlogPost);

// Delete Blog Post
blogsRouter.delete("/blogs/:id", DeleteBlogPost);
