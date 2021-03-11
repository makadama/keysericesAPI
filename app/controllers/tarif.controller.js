const db = require("../models");
const config = require("../config/auth.config");
const Tarif = db.tarif;


exports.getAll = (req, res) => {
  Tarif.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Tarif.findOne({
    where: {
      id: req.params.tarifId
    }
  })
  .then(tarif => {
      if (!tarif) {
        return res.status(404).send({ message: "Tarif Not found." });
      }
  res.status(200).send({
          id: tarif.id,
          libelle: tarif.libelle,
          commission: tarif.commission
    });
   });
};

exports.createOne = (req, res) => {
  Tarif.create({
      libelle: req.body.libelle,
      commission : req.body.commission
  })
  .then(tarif=> {
    res.send({ message: "Tarif was saved successfully!" })
})
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};

exports.updateOne = (req, res) => {
    Tarif.findOne({
    where: {
      id: req.params.tarifId
    }
  })
  .then(tarif => {
      if (!tarif) {
        return res.status(404).send({ message: "Tarif Not found." });
      }
      
      tarif.update({
          commission: req.body.commission
      })
      .then(res.send({ message: "Tarif was updated successfully!" }))
        .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Tarif.destroy({
        where : {id: req.params.tarifId}
    })
    .then(res.send({message : "Tarif was deleted successfully"}))
}
