const { authJwt } = require("../middlewares");
const controller = require("../controllers/tarif.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/tarifs", 
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getAll);
    
  app.post(
    "/api/tarifs",
    [authJwt.verifyToken, authJwt.isAdmin],   
    controller.createOne
  );

  app.get(
    "/api/tarif/:tarifId",
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getOne
  );
    
  app.put(
    "/api/tarif/:tarifId",
    [authJwt.verifyToken, authJwt.isAdmin],   
    controller.updateOne
  );
    
  app.delete(
    "/api/tarif/:tarifId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOne
  );
    

};