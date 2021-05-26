import { AuthenticationError, UserInputError } from "apollo-server";
import Filter from "bad-words";
const filter = new Filter();

import Post from "../../models/Post";
import checkAuth from "../../utils/checkAuth";

export const Query = {
  async getPosts(_, { }, context) {
    try {
      const user = checkAuth(context);
      const posts = await Post.find().sort({ createdAt: -1 });
      return posts;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getPost(_, { postId }, context) {
    try {
      checkAuth(context);
      const post = await Post.findById(postId);
      if (post)
        return post;
      else
        throw new Error("Post not found");
    } catch (err) {
      throw new Error(err);
    }
  },
};
export const Mutation = {
  async createPost(_, { title, body }, context) {
    if (body.trim() === "")
      throw new UserInputError("Post cannot be empty.");
    const user = checkAuth(context);
    title = filter.clean(title);
    body = filter.clean(body);
    const newPost = new Post({
      title,
      body,
      user: user.id,
      username: user.username,
      createdAt: new Date().toISOString(),
    });

    const post = await newPost.save();

    return post;
  },
  async deletePost(_, { postId }, context) {
    const user = checkAuth(context);
    try {
      const post = await Post.findById(postId);
      if (user.username === post.username) {
        await post.delete();
        return "Post deleted successfully.";
      } else
        throw new AuthenticationError("Action not allowed.");
    } catch (err) {
      throw new Error(err);
    }
  },
  async likePost(_, { postId }, context) {
    const { username } = checkAuth(context);
    const post = await Post.findById(postId);
    if (post) {
      if (post.likes.find((like) => like.username === username)) {
        // Post already liked, unlike
        post.likes = post.likes.filter((like) => like.username !== username);
      } else {
        // Post not liked, like
        post.likes.push({
          username,
          createdAt: new Date().toISOString(),
        });
      }
      await post.save();
      return post;
    } else
      throw new UserInputError("Post not found.");
  },
};
