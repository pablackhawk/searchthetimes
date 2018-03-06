import React from 'react';
import { Container } from '../Grid';

const Saved = props => (
  <Container>
    <li className="list-group-item">
      <h4>
        <span>
          <em>{props.title}</em>
        </span>
        <span className="btn-group">
          <a href={props.url} target="_blank">
            <button type="button" className="btn btn-outline-secondary ">
              View Article
            </button>
          </a>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => props.handleDeleteButton(props._id)}
          >
            Delete Article
          </button>
        </span>
      </h4>
      <p>Date Published: {props.date}</p>
    </li>
  </Container>
);

export default Saved;
