import React from "react";
import "./App.css";
import { Container, Segment, Grid, Image, Header } from "semantic-ui-react";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import axios from "axios";

class App extends React.Component {
  state = { videos: [], selectedVideo: null };

  contextRef = React.createRef();

  // When the page loads for the first time, run a search with an empty search term
  componentDidMount() {
    this.onTermSubmit("");
  }

  // Run a search with the search term provided by SearchBar.js
  onTermSubmit = term => {
    axios
      .get("http://localhost:3001/search", {
        params: {
          q: term
        }
      })
      .then(response => response.data)
      .then(response =>
        this.setState({
          videos: response,
          selectedVideo: response[0]
        })
      )
      .catch(err => console.log(err));
  };

  // Set state with a video from VideoItem/VideoList. This part of state is used by VideoDetail
  onVideoSelect = video => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div>
        <>
          {" "}
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
            <SearchBar onFormSubmit={this.onTermSubmit} />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={11}>
                  <VideoDetail
                    video={this.state.selectedVideo}
                    contextRef={this.contextRef}
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  <VideoList
                    onVideoSelect={this.onVideoSelect}
                    videos={this.state.videos}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </>
      </div>
    );
  }
}

export default App;
