const Post = require("../models/Post-model");
const formidable = require("formidable");
const fs = require("fs");

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

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "image could not be uploaded." });
    }
    let post = new Post(fields);
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err: err
        });
      }
      res.json(result);
    });
  });
};
