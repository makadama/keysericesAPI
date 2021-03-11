const { authJwt } = require("../middlewares");
const controller = require("../controllers/tache.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/taches", 
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getAll);
    
  app.post(
    "/api/taches",
    [authJwt.verifyToken],
    controller.createOne
  );

  app.get(
    "/api/tache/:tacheId",
    [authJwt.verifyToken],
    controller.getOne
  );
    
  app.put(
    "/api/tache/:tacheId",
    [authJwt.verifyToken],
    controller.updateOne
  );
    
  app.delete(
    "/api/tache/:tacheId",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteOne
  );
    
    
  app.get(
    "/api/employe/taches/:employeId",
    [authJwt.verifyToken],
    controller.getAllForEmploye
  );

};