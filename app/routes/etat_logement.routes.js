const { authJwt } = require("../middlewares");
const controller = require("../controllers/etat_logement.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/etats_logement", 
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getAll);
    
  app.post(
    "/api/etats_logement",
    [authJwt.verifyToken, authJwt.isAdmin],   
    controller.createOne
  );

  app.get(
    "/api/etat_logement/:etat_logementId",
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getOne
  );
    
  app.put(
    "/api/etat_logement/:etat_logementId",
    [authJwt.verifyToken, authJwt.isAdmin],   
    controller.updateOne
  );
    
  app.delete(
    "/api/etat_logement/:etat_logementId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteOne
  );
    

};