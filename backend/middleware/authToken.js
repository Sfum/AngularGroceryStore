const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../model");
const User = db.user;
const Role = db.role;

// Middleware to verify the authentication token
verifyToken = (req, res, next) => {
  // Extracting the token from the session
  let token = req.session.token;

  // Checking if a token is provided
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // Verifying the token using the secret key
  jwt.verify(token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      // Extracting user ID from the decoded token and adding it to the request
      req.userId = decoded.id;
      next();
    });
};

// Middleware to check if the user has an admin role
isAdmin = (req, res, next) => {
  // Finding the user by ID and checking for admin role
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    // Finding roles associated with the user
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        // Checking if the user has an admin role
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        // If user does not have an admin role, sending a 403 Forbidden response
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

// Exporting the middleware functions as an object
const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
