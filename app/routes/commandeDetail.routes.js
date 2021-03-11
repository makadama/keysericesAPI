const { authJwt } = require("../middlewares");
const controller = require("../controllers/commandeDetail.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/commandeDetails", 
    [authJwt.verifyToken],   
    controller.getAll);
    
  app.post(
    "/api/commandeDetails",
    [authJwt.verifyToken],   
    controller.createOne
  );

  app.get(
    "/api/commandeDetail/:commandeDetailId",
    [authJwt.verifyToken],   
    controller.getOne
  );
    
  /*app.get(
    "/api/logement/disponibilites/:logementId",
    [authJwt.verifyToken],   
    controller.getAllByLogementId
  );*/
    
  app.put(
    "/api/commandeDetail/:commandeDetailId",
    [authJwt.verifyToken],   
    controller.updateOne
  );
    
  app.delete(
    "/api/commandeDetail/:commandeDetailId",
    [authJwt.verifyToken],
    controller.deleteOne
  );

  app.delete(
    "/api/commandeDetails/:commandeId",
    [authJwt.verifyToken],
    controller.deleteOrderDetails
  );

   app.get(
    "/api/commandeDetail/:voyageurId",
    [authJwt.verifyToken],
    controller.getAllFromVoyageur
  );


   app.get(
    "/api/commandeDetails/:commandeId",
    [authJwt.verifyToken],
    controller.getAllFromCommande
  );
    

};