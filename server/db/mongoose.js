const mongoose = require('mongoose');

// Connection URL
const url = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports = {
  mongoose
};