export let user = undefined;
// Importing necessary middleware and controller modules
const { authToken } = require("../middleware");
const controller = require("../controller/user.controller");

// Exporting a function to configure routes for the provided Express app
module.exports = function(app) {
  // Middleware to handle CORS headers
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // Public route accessible to all users
  app.get("/api/test/all", controller.allAccess);

  // Route accessible to authenticated users
  app.get("/api/test/user", [authToken.verifyToken], controller.userBoard);

  // Route accessible to authenticated users with admin role
  app.get(
    "/api/test/admin",
    [authToken.verifyToken, authToken.isAdmin],
    controller.adminBoard
  );
};
