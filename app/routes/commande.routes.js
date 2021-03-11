const { authJwt } = require("../middlewares");
const controller = require("../controllers/commande.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/commandes", 
    [authJwt.verifyToken],   
    controller.getAll);
    
  app.post(
    "/api/commandes",
    [authJwt.verifyToken],   
    controller.createOne
  );

  app.get(
    "/api/commande/:commandeId",
   controller.getOne
  );
    
  /*app.get(
    "/api/logement/disponibilites/:logementId",
    [authJwt.verifyToken],   
    controller.getAllByLogementId
  );*/
    
  app.put(
    "/api/commande/:commandeId",
    controller.updateOne
  );
    
  app.delete(
    "/api/commande/:commandeId",
    [authJwt.verifyToken],
    controller.deleteOne
  );
    

};