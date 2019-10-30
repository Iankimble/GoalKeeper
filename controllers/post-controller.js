const Post = require("../models/Post");

exports.getPosts = (req, res) => {
  res.json({
    post: [{ title: "some text one" }, { title: "some text two" }]
  });
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  console.log("creating post", req.body);
  post.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.status(200).json({
      post: result
    });
  });
};
