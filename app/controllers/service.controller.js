const db = require("../models");
const config = require("../config/auth.config");
const Service = db.service;
const Tarif = db.tarif;


exports.getAll = (req, res) => {
  Service.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Service.findOne({
    where: {
      id: req.params.serviceId
    }
  })
  .then(service => {
      if (!service) {
        return res.status(404).send({ message: "Service Not found." });
      }
  res.status(200).send({
          id: service.id,
          libelle: service.libelle,
          fk_tarif: service.fk_tarif
    });
   });
};

exports.createOne = (req, res) => {
 Tarif.findOne({
     where:{
         id:req.body.fk_tarif
     }
 })
 .then(tarif =>{
     console.log("TARIF " + tarif);
     if(!tarif){
         return res.status(404).send({message:"Le tarif associé n'existe pas"})
     }
     else{
         Service.create({
            libelle : req.body.libelle,
            fk_tarif : req.body.fk_tarif
        })
        .then(res.send({ message: "Service was saved successfully!" }))
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
     }
 })
    
    

  
};

exports.updateOne = (req, res) => {
    Service.findOne({
    where: {
      id: req.params.serviceId
    }
  })
  .then(service => {
      if (!service) {
        return res.status(404).send({ message: "Service Not found." });
      }
      
      service.update({
        libelle : req.body.libelle,
        fk_tarif : req.body.fk_tarif
      })
      .then(res.send({ message: "Service was updated successfully!" }))
        .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Service.destroy({
        where : {id: req.params.serviceId}
    })
    .then(res.send({message : "Service was deleted successfully"}))
}
