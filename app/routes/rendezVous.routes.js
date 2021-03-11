const { authJwt } = require("../middlewares");
const controller = require("../controllers/rendezVous.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/rendezVous", 
    [authJwt.verifyToken],   
    controller.getAll);
    
  app.post(
    "/api/rendezVous",
    [authJwt.verifyToken],   
    controller.createOne
  );

  app.get(
    "/api/rendezVous/:rendezVousId",
    [authJwt.verifyToken],   
    controller.getOne
  );
    
  
    
  app.put(
    "/api/rendezVous/:rendezVousId",
    [authJwt.verifyToken],   
    controller.updateOne
  );
    
  app.delete(
    "/api/rendezVous/:rendezVousId",
    [authJwt.verifyToken],
    controller.deleteOne
  );

  app.get(
    "/api/rendezVouss/:voyageurId",
    [authJwt.verifyToken],
    controller.getAllFromVoyageur
  );

    

};