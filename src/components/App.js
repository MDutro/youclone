import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Container, Segment, Grid, Image, Header } from "semantic-ui-react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import axios from "axios";

const App = () => {
  const [videos, setVideos] = useState({videos: [], selectedVideo: ""})

  // contextRef = React.createRef();

  

  

  // Run a search with the search term provided by SearchBar.js
  const onTermSubmit = useCallback(term => {
    axios
      .get("http://localhost:3001/search", {
        params: {
          q: term
        }
      })
      .then(response => response.data)
      .then(response =>
        setVideos(vids => ({ ...vids,
          videos: response,
          selectedVideo: response[0]
        }))
      )
      .catch(err => console.log(err));
  }, [])

  // When the page loads for the first time, run a search with an empty search term
  useEffect(() => onTermSubmit(""), [onTermSubmit])

  // Set state with a video from VideoItem/VideoList. This part of state is used by VideoDetail
  const onVideoSelect = video => {
    setVideos({ ...videos, selectedVideo: video });
  };

  return (
    <div>
      <>
        <Segment>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={1}>
                <Image
                  src="/video.svg"
                  size="tiny"
                  middle-aligned="true"
                  alt=""
                />
              </Grid.Column>
              <Grid.Column width={15} verticalAlign="middle">
                <Header as="h1">YouClone - A YouTube Clone</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Container>
          <SearchBar onFormSubmit={onTermSubmit} />
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={11}>
                <VideoDetail
                  video={videos.selectedVideo}
                  // contextRef={this.contextRef}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <VideoList
                  onVideoSelect={onVideoSelect}
                  videos={videos.videos}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    </div>
  );
}

export default App;
