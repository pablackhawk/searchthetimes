import React, { Component } from 'react';
import Saved from './Saved';
import Search from './Search';
import Results from './Results';
import API from '../utils/api';

class Main extends Component {
  state = {
    topic: '',
    startYear: '',
    endYear: '',
    articles: [],
    saved: []
  };

  // Get list of saved articles on component mount
  componentDidMount() {
    this.getSavedArticles();
  }

  // Method for retrieving saved articles from the db
  getSavedArticles = () => {
    API.getArticle().then(res => {
      this.setState({ saved: res.data });
    });
  };

  //Helper for rendering single search div for each article
  renderARticles = () => {
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

  handleTopicChange = event => {
    this.setState({ topic: event.target.value });
  };

  handleStartYearChange = event => {
    this.setState({ startYear: event.target.value });
  };

  handleEndYearChange = event => {
    this.setState({ endYear: event.target.value });
  };

  // Executes API search on form submit
  handleFormSubmit = event => {
    event.precentDefault();
    API.searchNYT(
      this.state.topic,
      this.state.startYear,
      this.state.endYear
    ).then(res => {
      this.setState({ articles: res.data.response.docs });
    });
  };

  // Saves article to db on save button click
  handleSaveButton = id => {
    const findArticleById = this.state.articles.find(
      element => element._id === id
    );
    const newSave = {
      title: findArticleById.headline.main,
      date: findArticleById.pub_date,
      url: findArticleById.web_url
    };
    API.saveArticle(newSave).then(this.getSavedArticles());
  };

  // Removes article from db on delete button click
  handleDeleteButton = id => {
    API.deleteArticle(id).then(this.getSavedArticles());
  };

  render() {
    return (
      <div className="main-container">
        <div className="container">
          {/* Jumbotron */}
          <div className="jumbotron">
            <h1 className="text-center">
              <strong>New York Times Article Search</strong>
            </h1>
            <h2 className="text-center">
              Search for articles and save your favorites!
            </h2>
          </div>
          {/* Search Form and Results Section */}
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />
          {/* Saved Articles Section */}
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
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
              </div>
            </div>
          </div>
          <footer>
            <hr />
            <p className="pull-right">
              <i className="fab fa-github" aria-hidden="true" />
              Proudly built using React.js
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Main;
