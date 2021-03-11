const { authJwt } = require("../middlewares");
const controller = require("../controllers/panier.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/paniers", 
    [authJwt.verifyToken],   
    controller.getAll);
    
  app.post(
    "/api/paniers",
    [authJwt.verifyToken],   
    controller.createOne
  );

  app.get(
    "/api/panier/:panierId",
    [authJwt.verifyToken],   
    controller.getOne
  );
    
  app.put(
    "/api/panier/:panierId",
    [authJwt.verifyToken],   
    controller.updateOne
  );
    
  app.delete(
    "/api/panier/:panierId",
    [authJwt.verifyToken],
    controller.deleteOne
  );
    

};