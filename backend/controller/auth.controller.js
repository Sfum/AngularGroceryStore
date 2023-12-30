const config = require("../config/auth.config");
const db = require("../model");
const User = db.user;
const Role = db.name;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Handling user signup
exports.signup = (req, res) => {
  // Creating a new user instance with provided information
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  // Saving the user to the database
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    // Checking if roles are provided in the request
    if (req.body.roles) {
      // Finding roles in the database based on provided role names
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          // Assigning role IDs to the user
          user.roles = roles.map((role) => role._id);

          // Saving the user with assigned roles
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      // If no roles provided, assigning a default role ('user')
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];

        // Saving the user with the default role
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

// Handling user signin
exports.signin = (req, res) => {
  // Finding a user by username and populating their roles
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      // If user not found
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // Validating the provided password
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      // Generating a JWT token for authentication
      const token = jwt.sign({ id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

      // Extracting user roles for response
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      // Storing the token in the session
      req.session.token = token;

      // Sending user information and roles in the response
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
      });
    });
};

// Handling user signout
exports.signout = async (req, res) => {
  try {
    // Destroying the session to sign the user out
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    // Handling errors during signout
    this.next(err);
  }
};
