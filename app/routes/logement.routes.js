const { authJwt } = require("../middlewares");
const controller = require("../controllers/logement.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/logements",   
    controller.getAll);
    
  app.post(
    "/api/logements",
    [authJwt.verifyToken],
    controller.createOne
  );

  app.get(
    "/api/logement/:logementId",
    [authJwt.verifyToken],
    controller.getOne
  );
    
  app.put(
    "/api/logement/:logementId",
    [authJwt.verifyToken],
    controller.updateOne
  );
    
  app.delete(
    "/api/logement/:logementId",
    [authJwt.verifyToken],
    controller.deleteOne
  );
    
    
  app.get(
    "/api/logements/:hoteId",
    [authJwt.verifyToken],
    controller.getAllFromHote
  );

};