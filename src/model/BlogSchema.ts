import mongoose from "mongoose";

const { Schema, model } = mongoose;

export interface IBlog {
  title: String;
  content: String;
  createdAt: Date;
}

export interface IBlogPostModel extends mongoose.Model<IBlog> {
  isBlogPostTitleTaken(title: string, id?: string): Promise<boolean>;
}

const blogSchema = new Schema({
  title: { type: String, required: true, trim: true, unique: true },
  content: { type: String, required: true, trim: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

blogSchema.static("isBlogPostTitleTaken", async function (title: string, id?: string): Promise<boolean> {
  const blogPost: IBlog = await this.findOne({
    title: title.toLocaleLowerCase(),
    _id: { $ne: id },
  });

  return !!blogPost;
});

export default model<IBlog, IBlogPostModel>("BlogSchema", blogSchema);
