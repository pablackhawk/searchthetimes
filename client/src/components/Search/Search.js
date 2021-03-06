import React from 'react';
import { Container, Row, Col } from '../Grid';

const Search = props => (
  <Container>
    <Row>
      <Col size="lg-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">
              <strong>
                <i className="fas fa-search" aria-hidden="true" /> Search
              </strong>
            </h3>
          </div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label htmlFor="topic">Topic</label>
                <input
                  onChange={props.handleTopicChange}
                  type="text"
                  className="form-control"
                  id="topic"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group">
                <label htmlFor="start-year">Start Year</label>
                <input
                  onChange={props.handleStartYearChange}
                  type="text"
                  className="form-control"
                  id="start-year"
                />
              </div>
              <div className="form-group">
                <label htmlFor="end-year">End Year</label>
                <input
                  onChange={props.handleEndYearChange}
                  type="text"
                  className="form-control"
                  id="end-year"
                />
              </div>
              <button
                onClick={props.handleFormSubmit}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Col>
    </Row>

    <br />
    <br />

    <Row>
      <Col size="lg-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">
              <strong>
                <i className="far fa-newspaper" aria-hidden="true" /> Results
              </strong>
            </h3>
          </div>
          <div className="panel-body">{props.renderArticles()}</div>
        </div>
      </Col>
    </Row>
    <br />
    <br />
  </Container>
);

export default Search;
