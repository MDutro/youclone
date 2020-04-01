import "./VideoItem.css";
import React from "react";
import { Image, Item } from "semantic-ui-react";

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <Item onClick={() => onVideoSelect(video)} id="video-item">
      <Image src={video.snippet.thumbnails.medium.url} alt="" />
      <Item.Content>
        <Item.Header>{video.snippet.title}</Item.Header>
      </Item.Content>
    </Item>
  );
};

export default VideoItem;
