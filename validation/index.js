exports.createPostValidator = (req, res, next) => {
  req.check("title", "Please provide a title.").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters.").isLength({
    min: 4,
    max: 150
  });

  req.check("body", "Pleas provide some text.").notEmpty();
  req.check("body", "Text must be between 2- 3000 characters").isLength({
    min: 2,
    max: 3000
  });

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }

  next();
};
