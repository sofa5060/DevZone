import React from "react";
import PostSummary from "./PostSummary";

const PostsList = ({ posts }) => {
  return (
    <div style={{ width: "100%" }}>
      {posts.map((post) => (
        <PostSummary key={post.postID} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
