import { Query as postQuery, Mutation as postMutation } from "./posts";
import { Mutation as userMutation } from "./users";
import { Mutation as commentsMutation } from "./comments";

export const Post = {
  likeCount: (parent) => parent.likes.length,
  commentCount: (parent) => parent.comments.length,
};
export const Query = {
  ...postQuery,
};
export const Mutation = {
  ...userMutation,
  ...postMutation,
  ...commentsMutation,
};
