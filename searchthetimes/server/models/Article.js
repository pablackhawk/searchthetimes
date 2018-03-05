const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  date: Date,
  url: String
});

let Article = mongoose.model('Article', articleSchema);

module.exports = Article;
