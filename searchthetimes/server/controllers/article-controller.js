const Article = require('../models/Article');

module.exports = {
  // Locates all artices in db
  find: (req, res) => {
    console.log(`Gathering saved articles from the database...`);
    Article.find()
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        res.json(err);
      });
  },

  // Adds new articles to db
  insert: (req, res) => {
    console.log(`Adding saved articles to the database...`);
    console.log(req.body);
    Article.create(req.body)
      .then(doc => {
        res.json(doc);
        console.log(doc);
      })
      .catch(err => {
        res.json(err);
      });
  },

  // Handles removing articles from the db
  delete: (req, res) => {
    console.log(`Deleting saved article from the database...`);
    Article.remove({ _id: req.params.id })
      .then(doc => {
        res.json(doc);
        console.log(doc);
      })
      .catch(err => {
        res.json(err);
      });
  }
};
