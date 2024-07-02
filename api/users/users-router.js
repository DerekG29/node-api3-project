const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get('/:id', validateUserId, (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put('/:id', [validateUserId, validateUser], (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next);
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { text } = req.body;
  const user_id = parseInt(req.params.id);
  Posts.insert({ text, user_id })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(next);
});

// do not forget to export the router
module.exports = router;