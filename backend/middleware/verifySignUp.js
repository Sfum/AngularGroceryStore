const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;

// Middleware to check for duplicate username or email during user signup
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Checking for duplicate username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    // If username is already in use, send a 400 Bad Request response
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Checking for duplicate email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      // If email is already in use, send a 400 Bad Request response
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      // If both username and email are unique, proceed to the next middleware
      next();
    });
  });
};

// Middleware to check if provided roles exist in the predefined roles array
checkRolesExisted = (req, res, next) => {
  // If roles are provided in the request body
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      // Checking if the role exists in the predefined roles array
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  // If all provided roles exist, proceed to the next middleware
  next();
};

// Exporting the middleware functions as an object
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
