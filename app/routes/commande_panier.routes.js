const { authJwt } = require("../middlewares");
const controller = require("../controllers/commande_panier.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/commandes_paniers", 
    [authJwt.verifyToken],   
    controller.getAll);
    
  app.post(
    "/api/commandes_paniers",
    [authJwt.verifyToken],   
    controller.createOne
  );

  app.get(
    "/api/commande_panier/:commande_panierId",
    [authJwt.verifyToken],   
    controller.getOne
  );
    
  app.put(
    "/api/commande_panier/:commande_panierId",
    [authJwt.verifyToken],   
    controller.updateOne
  );
    
  app.delete(
    "/api/commande_panier/:commande_panierId",
    [authJwt.verifyToken],
    controller.deleteOne
  );
    

};