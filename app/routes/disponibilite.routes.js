const { authJwt } = require("../middlewares");
const controller = require("../controllers/disponibilite.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/disponibilites", 
    [authJwt.verifyToken],   
    controller.getAll);
    
  app.post(
    "/api/disponibilites",
    [authJwt.verifyToken],   
    controller.createOne
  );

  app.get(
    "/api/disponibilite/:disponibiliteId",
    [authJwt.verifyToken],   
    controller.getOne
  );
    
  app.get(
    "/api/logement/disponibilites/:logementId",
    [authJwt.verifyToken],   
    controller.getAllByLogementId
  );
    
  app.put(
    "/api/disponibilite/:disponibiliteId",
    [authJwt.verifyToken],   
    controller.updateOne
  );
    
  app.delete(
    "/api/disponibilite/:disponibiliteId",
    [authJwt.verifyToken],
    controller.deleteOne
  );
    

};