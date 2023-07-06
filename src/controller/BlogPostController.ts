import { Request, Response } from "express";
import BlogSchema from "../model/BlogSchema";

const GetBlogPosts = async (req: Request, res: Response) => {
  try {
    const blogPosts = await BlogSchema.find();
    res.status(200).json({ blogPosts });
  } catch (error) {
    res.sendStatus(500);
  }
};

const GetBlogPost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;

  try {
    const blogPost = await BlogSchema.findById(postId);

    if (blogPost) {
      res.status(200).json({ post: blogPost });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const CreateBlogPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  // Check if Title or Message body are empty
  if (!title || !content) return res.status(400).json({ message: "Title and body are required" });
  // Check if Blog Post title is already taken
  else if (await BlogSchema.isBlogPostTitleTaken(title))
    return res.status(400).json({ message: "Title is already taken" });

  try {
    const blogPost = await BlogSchema.create({ title, content });
    res.status(201).json(blogPost);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const DeleteBlogPost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;

  try {
    const deleteResponse = await BlogSchema.deleteOne({ _id: postId });

    if (deleteResponse.deletedCount === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const UpdateBlogPost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  const { title, content } = req.body;

  // Check if Title or Message body are empty
  if (!title || !content) return res.status(400).json({ message: "Title and body are required" });
  // Check if Blog Post title is already taken
  else if (await BlogSchema.isBlogPostTitleTaken(title))
    return res.status(400).json({ message: "Title is already taken" });

  try {
    const post = await BlogSchema.findByIdAndUpdate(postId, { title, content }, { new: true });
    if (post) {
      res.status(200).json({ post });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

export { GetBlogPosts, GetBlogPost, CreateBlogPost, DeleteBlogPost, UpdateBlogPost };
