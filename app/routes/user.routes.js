const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



 app.get("/api/users", 
    [authJwt.verifyToken, authJwt.isAdmin],   
    controller.getAll);

 
    
  app.post(
    "/api/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createOne
  );

  app.post(
    "/api/newUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createNewOne
  );

  app.get(
    "/api/user/:userId",
    [authJwt.verifyToken],
    controller.getOne
  );
    
  app.put(
    "/api/user/:userId",
    [authJwt.verifyToken],
    controller.updateOne
  );
    
  app.delete(
    "/api/user/:userId",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteOne
  );


  //ajouté 
app.get("/api/current_user", controller.getCurrentUser
  );

app.post(
    "/api/userEmailing",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.sendLinkByEmail
  );

};