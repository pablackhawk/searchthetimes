import React, { Component } from 'react';
import Saved from '../Saved';
import { Col, Row, Container } from '../Grid';
import Jumbotron from '../Jumbotron';
import Search from '../Search';
import Results from '../Results';
import API from '../../utils/API';

class Main extends Component {
  state = {
    topic: '',
    startYear: '',
    endYear: '',
    articles: [],
    saved: []
  };

  // When the component mounts, get a list of all saved articles and update this.state.saved
  componentDidMount() {
    this.getSavedArticles();
  }

  // Method for getting saved articles (all articles) from the db
  getSavedArticles = () => {
    API.getArticle().then(res => {
      this.setState({ saved: res.data });
    });
  };

  // A helper method for rendering one search results div for each article
  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  };

  // A helper method for rendering one div for each saved article
  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  };

  // Keep track of what user types into topic input so that input can be grabbed later
  handleTopicChange = event => {
    this.setState({ topic: event.target.value });
  };

  // Keep track of what user types into topic input so that input can be grabbed later
  handleStartYearChange = event => {
    this.setState({ startYear: event.target.value });
  };

  // Keep track of what user types into topic input so that input can be grabbed later
  handleEndYearChange = event => {
    this.setState({ endYear: event.target.value });
  };

  // When the search form submits, perform NYT api search with user input
  handleFormSubmit = event => {
    event.preventDefault();
    console.log('Getting NYT Articles');
    console.log('this.state.topic: ', this.state.topic);
    console.log('this.state.startYear: ', this.state.startYear);
    console.log('this.state.endYear: ', this.state.endYear);
    API.searchNYT(
      this.state.topic,
      this.state.startYear,
      this.state.endYear
    ).then(res => {
      this.setState({ articles: res.data.response.docs });
      console.log('this.state.articles: ', this.state.articles);
    });
  };

  // When save article button is clicked, add article to db
  handleSaveButton = id => {
    const findArticleByID = this.state.articles.find(
      element => element._id === id
    );
    const newSave = {
      title: findArticleByID.headline.main,
      date: findArticleByID.pub_date,
      url: findArticleByID.web_url
    };
    API.saveArticle(newSave).then(this.getSavedArticles());
  };

  // When delete article button is clicked, remove article from db
  handleDeleteButton = id => {
    API.deleteArticle(id).then(this.getSavedArticles());
  };

  render() {
    return (
      <div className="main-container">
        <Container>
          {/* Jumbotron */}
          <Jumbotron>
            <h1 className="text-center">
              <strong>New York Times Article Search</strong>
            </h1>
            <h2 className="text-center">
              Search for and save articles of interest.
            </h2>
          </Jumbotron>
          {/* Search Form and Results Section */}
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />
          {/* Saved Articles Section */}
          <Container>
            <Row>
              <Col size="lg-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      <strong>
                        <i className="fas fa-download" aria-hidden="true" />{' '}
                        Saved Articles
                      </strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <ul className="list-group">{this.renderSaved()}</ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <footer>
            <hr />
            <p className="text-center">
              Copyright <i class="far fa-copyright" /> 2018 Laurentius
              Tirtarahardja. Built using React.js
              <a href="https://github.com/pablackhawk">
                <i
                  id="github-link"
                  className="fab fa-github"
                  aria-hidden="true"
                />
              </a>
            </p>
          </footer>
        </Container>
      </div>
    );
  }
}

export default Main;
