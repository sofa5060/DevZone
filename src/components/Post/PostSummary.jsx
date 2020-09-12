import React from 'react'

const PostSummary = ({post}) => {
  console.log(post)
  return (
    <div>
      <h1>{post.postData.title}</h1>
    </div>
  )
}

export default PostSummary
