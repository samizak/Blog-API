import { Router } from "express";
import BlogSchema from "../model/BlogSchema";
import { Request, Response } from "express";

import { GetBlogPosts, GetBlogPost, CreateBlogPost } from "../controller/BlogPostController";

export const blogsRouter = Router();

blogsRouter.get("/blogs", GetBlogPosts);
blogsRouter.get("/blogs/:id", GetBlogPost);

blogsRouter.post("/blogs", CreateBlogPost);

// router.put('/:id', authMiddleware, updatePost);

// router.put('/:id/publish', authMiddleware, publishPost);

// router.put('/:id/unpublish', authMiddleware, unpublishPost);

// router.delete('/:id', authMiddleware, deletePost);
