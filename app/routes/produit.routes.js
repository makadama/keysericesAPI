const { authJwt } = require("../middlewares");
const controller = require("../controllers/produit.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/produits", 
    [authJwt.verifyToken],   
    controller.getAll);
    
  app.post(
    "/api/produits",
    [authJwt.verifyToken],   
    controller.createOne
  );

  app.get(
    "/api/produit/:produitId",
    [authJwt.verifyToken],   
    controller.getOne
  );
    
  /*app.get(
    "/api/logement/disponibilites/:logementId",
    [authJwt.verifyToken],   
    controller.getAllByLogementId
  );*/
    
  app.put(
    "/api/produit/:produitId",
    [authJwt.verifyToken],   
    controller.updateOne
  );
    
  app.delete(
    "/api/produit/:produitId",
    [authJwt.verifyToken],
    controller.deleteOne
  );
    

};