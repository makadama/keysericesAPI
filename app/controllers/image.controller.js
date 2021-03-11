const fs = require("fs");

const db = require("../models");
const Image = db.images;
const config = require("../config/auth.config");

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body.fk_logement);

    if (req.file == undefined && req.body.fk_logement==undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
   	  fk_logement: req.body.fk_logement,
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};