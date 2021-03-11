const { authJwt } = require("../middlewares");
const controller = require("../controllers/annonce.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/annonces", 
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getAll);
    
  app.post(
    "/api/annonces",
    [authJwt.verifyToken, authJwt.isAdmin],   
    controller.createOne
  );

  app.get(
    "/api/annonce/:annonceId",
    [authJwt.verifyToken],   
    controller.getOne
  );
    
  app.put(
    "/api/annonce/:annonceId",
    [authJwt.verifyToken],   
    controller.updateOne
  );
    
  app.delete(
    "/api/annonce/:annonceId",
    [authJwt.verifyToken],
    controller.deleteOne
  );
    

  app.get("/api/annonces/:voyageurId",
    [authJwt.verifyToken],
    controller.getAllFromVoyageur

);

app.get("/api/annoncess/:logementId",
    [authJwt.verifyToken],
    controller.getAllFromLogement

);

};