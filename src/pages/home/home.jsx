import React from "react";
import Topbar from "../../components/topbar/topbar";
import Feed from "../../components/feed/feed";
import "./home.css";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="container">
        <div className="feed">
          <Feed />
        </div>
      </div>
    </>
  );
}
