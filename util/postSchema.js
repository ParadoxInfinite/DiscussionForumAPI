var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  post: {
    type: String,
    required: true,
  }
});
var Post = mongoose.model('Post', PostSchema);
module.exports = Post;