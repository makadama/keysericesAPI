const { authJwt } = require("../middlewares");
const controller = require("../controllers/message.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/messages", 
    [authJwt.verifyToken, authJwt.isModerator],   
    controller.getAll);
    
  app.post(
    "/api/messages",
    [authJwt.verifyToken],
    controller.createOne
  );

  app.get(
    "/api/message/:messageId",
    [authJwt.verifyToken],
    controller.getOne
  );
    
  app.put(
    "/api/message/:messageId",
    [authJwt.verifyToken],
    controller.updateOne
  );
    
  app.delete(
    "/api/message/:messageId",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteOne
  );
    
    
  app.get(
    "/api/messages/:userId",
    [authJwt.verifyToken],
    controller.getAllFromDestinataire
  );

};