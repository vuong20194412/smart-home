const { verifyToken } = require("../middlewares/authJwtMiddleware");
const controller = require("../controllers/userController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, origin, content-type, accept");
    next();
  });

  app.get("/api/user", [verifyToken], controller.getUser);

  app.put("/api/user", [verifyToken], controller.updateUser);

  app.delete("/api/user", [verifyToken], controller.deleteUser);
};