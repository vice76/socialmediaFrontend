import React, { useEffect, useState, useContext } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./post.css";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";

export default function Post({
  postId,
  imageUrl,
  imageDesc,
  createdAt,
  userId,
  userName,
}) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [commentChanged, setCommentChanged] = useState("");
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (postId != null) {
          const response = await axios.get(
            `https://social-mediabackend-0f30044bc180.herokuapp.com/user/post/viewComment/${postId}`
          );
          setComments(response.data.usersComment);
        }
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [postId, commentChanged]);

  const handleCommentSubmit = async () => {
    try {
      const newComment = {
        commentedUserId: currentUser.userId,
        comment: commentInput,
        userId: userId,
        imageId: postId,
      };
      await axios.post(
        `https://social-mediabackend-0f30044bc180.herokuapp.com/user/post/comment`,
        newComment
      );
      setCommentInput("");
      const response = await axios.get(
        `https://social-mediabackend-0f30044bc180.herokuapp.com/user/post/viewComment/${postId}`
      );
      setCommentChanged(response.data);
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <span className="postUsername">{userName}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <img src={imageUrl} alt="not found" className="postImg" />
          <span className="postText">{imageDesc}</span>
        </div>
        <div className="commentsSection">
          <div className="commentsList">
            {comments?.map((comment, index) => (
              <div key={index} className="comment">
                <span className="commentUser">{comment.userName}:</span>
                <span className="commentText">{comment.comment}</span>
              </div>
            ))}
          </div>
          <div className="commentInputContainer">
            <input
              type="text"
              className="commentInput"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button className="commentButton" onClick={handleCommentSubmit}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
