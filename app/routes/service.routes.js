const { authJwt } = require("../middlewares");
const controller = require("../controllers/service.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/services", 
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getAll);
    
  app.post(
    "/api/services",
    [authJwt.verifyToken, authJwt.isAdmin],   
    controller.createOne
  );

  app.get(
    "/api/service/:serviceId",
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getOne
  );
    
  app.put(
    "/api/service/:serviceId",
    [authJwt.verifyToken, authJwt.isAdmin],   
    controller.updateOne
  );
    
  app.delete(
    "/api/service/:serviceId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOne
  );
    

};