const { authJwt } = require("../middlewares");
const controller = require("../controllers/ville.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/villes", 
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getAll);
    
  app.post(
    "/api/villes",
    [authJwt.verifyToken, authJwt.isAdmin],   
    controller.createOne
  );

  app.get(
    "/api/ville/:villeId",
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getOne
  );
    
  app.put(
    "/api/ville/:villeId",
    [authJwt.verifyToken, authJwt.isAdmin],   
    controller.updateOne
  );
    
  app.delete(
    "/api/ville/:villeId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOne
  );
    

};