const { authJwt } = require("../middlewares");
const controller = require("../controllers/employe.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/employes", 
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getAll);
    
  app.post(
    "/api/employes",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createOne
  );

  app.get(
    "/api/employe/:employeId",
    [authJwt.verifyToken],
    controller.getOne
  );
    
  app.put(
    "/api/employe/:employeId",
    [authJwt.verifyToken],
    controller.updateOne
  );
    
  app.delete(
    "/api/employe/:employeId",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteOne
  );

};