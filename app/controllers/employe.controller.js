const db = require("../models");
const config = require("../config/auth.config");
const Employe = db.employe;

exports.getAll = (req, res) => {
  Employe.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Employe.findOne({
    where: {
      id: req.params.employeId
    }
  })
  .then(employe => {
      if (!employe) {
        return res.status(404).send({ employe: "Employe Not found." });
      }
  res.status(200).send({
          id: employe.id,
          lastname: employe.lastname,
          firstname : employe.firstname,
          email : employe.email,
          password : employe.password,
          adress : employe.adress,
          telephone : employe.telephone,
          role : employe.role
    });
   });
};

exports.createOne = (req, res) => {
  Employe.create({
          lastname: req.body.lastname,
          firstname : req.body.firstname,
          email : req.body.email,
          password : req.body.password,
          adress : req.body.adress,
          telephone : req.body.telephone,
          role : req.body.role
  })
  .then(res.send({ employe: "Employe was saved successfully!" }))
  .catch(err => {
      res.status(500).send({ employe: err.employe });
    });
  
};

exports.updateOne = (req, res) => {
    Employe.findOne({
    where: {
      id: req.params.employeId
    }
  })
  .then(employe => {
      if (!employe) {
        return res.status(404).send({ employe: "Employe Not found." });
      }
      
      employe.update({
          lastname: req.body.lastname,
          firstname : req.body.firstname,
          email : req.body.email,
          password : req.body.password,
          adress : req.body.adress,
          telephone : req.body.telephone,
          role : req.body.role
      })
      .then(res.send({ employe: "Employe was updated successfully!" }))
        .catch(err => {
      res.status(500).send({ employe: err.employe });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Employe.destroy({
        where : {id: req.params.employeId}
    })
    .then(res.send({employe : "Employe was deleted successfully"}))
}




