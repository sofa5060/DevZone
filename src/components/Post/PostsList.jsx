import React, { useContext } from "react";
import { PostContext } from "../../Contexts/PostContext";
import PostSummary from "./PostSummary";

const PostsList = () => {
  const { posts } = useContext(PostContext);

  return (
    <div>
      {posts.map((post) => (
        <PostSummary key={post.postID} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
