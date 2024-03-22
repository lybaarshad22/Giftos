const mongoose = require('mongoose');
const { mongo, port } = require('./vars');

exports.connect = () => {
  mongoose.connect(mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 
  });
}
  return mongoose.connection;

