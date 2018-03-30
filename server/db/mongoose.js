const mongoose = require('mongoose');

// Database Name
const dbName = 'TodoApp';

// Connection URL
const url = `mongodb://localhost:27017/${dbName}`;

mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports = {
  mongoose
};