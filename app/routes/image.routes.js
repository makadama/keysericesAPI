const { authJwt } = require("../middlewares");
const controller = require("../controllers/image.controller");
const upload = require("../middlewares/upload");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/upload", upload.single("file"), [authJwt.verifyToken],  controller.uploadFiles);

  app.get("/api/getUpload/:filename", )

  };