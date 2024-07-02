const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'user not found' });
      } else {
        req.user = user;
        next();
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}