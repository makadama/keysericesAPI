const { authJwt } = require("../middlewares");
const controller = require("../controllers/commandeItem.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/commandeItems", 
   controller.getAll);
    
  app.post(
    "/api/commandeItems",
    [authJwt.verifyToken],   
    controller.createOne
  );

  app.get(
    "/api/commandeItem/:commandeItemId",
    [authJwt.verifyToken],   
    controller.getOne
  );
    
  /*app.get(
    "/api/logement/disponibilites/:logementId",
    [authJwt.verifyToken],   
    controller.getAllByLogementId
  );*/
    
  app.put(
    "/api/commandeItem/:commandeItemId",
    [authJwt.verifyToken],   
    controller.updateOne
  );
    
  app.delete(
    "/api/commandeItem/:commandeItemId",
    controller.deleteOne
  );

   app.get(
    "/api/commandeItems/:voyageurId",
    [authJwt.verifyToken],
    controller.getAllFromVoyageur
  );

 
    

};