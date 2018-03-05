// Dependecies
const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const path = require('path');

// Mongoose and Port configuration
const PORT = process.env.PORT || 3001;
mongoose.Promise = bluebird;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Routes
const articlesController = require('./server/controllers/article-controller');
const router = new express.Router();
// Get saved articles
router.get('/api/saved', articlesController.find);
// Save articles
router.post('/api/saved', articlesController.insert);
// Delete saved articles
router.delete('/api/saved/:id', articlesController.delete);
// Send all other requests to React app
router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.use(router);

// Mongoose connection
const db = process.env.MONGODB_URI || 'mongodb://localhost/nyt-react';
mongoose.connect(db, error => {
  if (error) throw error;
  console.log('Mongoose Connection Successful!');
});

app.listen(PORT, () => {
  console.log(`Server now on port ${PORT}`);
});
