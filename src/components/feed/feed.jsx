import React, { useContext, useEffect, useState } from "react";
import Post from "../post/post";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";
import Share from "../share/share";
import "./feed.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    const res = await axios.get(
      `https://social-mediabackend-0f30044bc180.herokuapp.com/api/images/all`
    );
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [user.userId]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share onPostUploaded={fetchPosts} />
        {posts.map((post) => (
          <Post
            key={post.imageId}
            postId={post.imageId}
            imageUrl={post.imageUrl}
            imageDesc={post.imageDesc}
            createdAt={post.createdAt}
            userId={post.userId}
            userName={post.userName}
          />
        ))}
      </div>
    </div>
  );
}
