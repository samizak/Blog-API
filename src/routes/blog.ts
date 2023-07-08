import { Router } from "express";
import passport from "passport";

import {
  GetBlogPosts,
  GetBlogPost,
  CreateBlogPost,
  DeleteBlogPost,
  UpdateBlogPost,
} from "../controller/BlogPostController";
import User from "../model/User";

require("dotenv").config();

export const blogsRouter = Router();

// Get Blog Posts
blogsRouter.get("/blogs", GetBlogPosts);
blogsRouter.get("/blogs/:id", GetBlogPost);

// Create new Blog Post
blogsRouter.post("/blogs", passport.authenticate("jwt", { session: false }), CreateBlogPost);

// Update Blog Post
blogsRouter.put("/blogs/:id", passport.authenticate("jwt", { session: false }), UpdateBlogPost);

// Delete Blog Post
blogsRouter.delete("/blogs/:id", passport.authenticate("jwt", { session: false }), DeleteBlogPost);
