import React from "react";
import { Segment, Form } from "semantic-ui-react";

class SearchBar extends React.Component {
  state = { term: "" };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onFormSubmit(this.state.term);
  };

  render() {
    return (
      <Segment className="ui segment">
        <Form onSubmit={this.onFormSubmit} className="ui form">
          <Form.Field className="field">
            <label>Video Search</label>
            <input
              type="text"
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
              placeholder="Enter search term"
            />
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default SearchBar;
