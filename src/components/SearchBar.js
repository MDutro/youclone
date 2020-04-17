import React, {useState} from "react";
import { Segment, Form } from "semantic-ui-react";

const SearchBar = (props) => {
  const [term, setTerm] = useState("")

  const onFormSubmit = event => {
    event.preventDefault();

    props.onFormSubmit(term);
  };

  return (
    <Segment className="ui segment">
      <Form onSubmit={onFormSubmit} className="ui form">
        <Form.Field className="field">
          <label>Video Search</label>
          <input
            type="text"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Enter search term"
          />
        </Form.Field>
      </Form>
    </Segment>
  );
}


export default SearchBar;
