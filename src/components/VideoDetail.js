import "./VideoDetail.css";
import React from "react";
import { Header, Segment } from "semantic-ui-react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return (
      <div>
        <img className="ui large image" src="/video.png" alt="" />
      </div>
    );
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div className="scroll">
      <div className="ui embed">
        <iframe src={videoSrc} title={video.snippet.title} />
      </div>
      <Segment>
        <Header as="h4">{video.snippet.title}</Header>
        <p>{video.snippet.description}</p>
      </Segment>
    </div>
  );
};

export default VideoDetail;
