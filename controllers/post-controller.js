const Post = require("../models/Post-model");

exports.getPosts = (req, res) => {
  const posts = Post.find()
    .select("_id title body")
    .then(posts => {
      res
        .status(200)
        .json({ posts })
        .catch(err => console.log(err));
    });
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  console.log("creating post", req.body);
  post.save().then(result => {
    res.status(200).json({
      post: result
    });
  });
};
