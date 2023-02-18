const { checkDuplicatePhoneOrEmail } = require("../middlewares/verifySignUpMiddleware");
const { verifyToken } = require("../middlewares/authJwtMiddleware");
const controller = require("../controllers/authController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, origin, content-type, accept");
    next();
  });

  app.post("/api/auth/sign-up", [checkDuplicatePhoneOrEmail], controller.signUp);

  app.post("/api/auth/sign-in", controller.signIn);

  app.post("/api/auth/sign-out", [verifyToken], controller.signOut);
};