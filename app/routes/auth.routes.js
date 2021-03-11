const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUserEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/signout", controller.signout);
  app.post("/api/auth/sendLinkByEmail", controller.sendLinkByEmail);
  app.post("/api/auth/sendPasswords", controller.sendPasswords);

    
    
  app.post(
    "/api/e/auth/signup",
    [
      verifySignUp.checkDuplicateEmployeEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signupEmploye
  );

  app.post("/api/e/auth/signin", controller.signinEmploye);

 

};