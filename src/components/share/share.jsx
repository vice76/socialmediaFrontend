import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";
import "./share.css";

export default function Share({ onPostUploaded }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const { user } = useContext(AuthContext);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);

    try {
      await axios.post(
        `https://social-mediabackend-0f30044bc180.herokuapp.com/api/images/upload?desc=${encodeURIComponent(
          description
        )}&userId=${user.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onPostUploaded();
      setDescription("");
      setImage("");
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  return (
    <div className="share">
      <form onSubmit={handleSubmit}>
        <div className="shareContainer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <textarea
            placeholder="What's on your mind?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Share</button>
        </div>
      </form>
    </div>
  );
}
