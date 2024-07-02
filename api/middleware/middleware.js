const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}

function validateUserId(req, res, next) {
  const id = req.params.id;
  if (typeof parseInt(id) !== 'number') {
    res.status(422).json({ message: 'ID must be an integer' });
  }
  Users.getById(id)
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
  // DO YOUR MAGIC
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