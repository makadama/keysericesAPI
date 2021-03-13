const db = require("../models");
const config = require("../config/auth.config");
const Message = db.message;
const User = db.user

exports.getAll = (req, res) => {
  Message.findAll()
    .then(function(result){
       res.status(200).send(result);
  })
};

exports.getOne = (req, res) => {
   Message.findOne({
    where: {
      id: req.params.messageId
    }
  })
  .then(message => {
      if (!message) {
        return res.status(404).send({ message: "Message introuvable" });
      }
  res.status(200).send({
          id: message.id,
          message: message.message,
          date_envoi : message.date_envoi,
          fk_destinataire : message.fk_destinataire,
          fk_auteur : message.fk_auteur
    });
   });
};

exports.createOne = (req, res) => {
  Message.create({
    message: req.body.message,
    date_envoi: req.body.date_envoi,
    fk_destinataire: req.body.fk_destinataire,
    fk_auteur: req.body.fk_auteur
  })
  .then(res.send({ message: "Message was saved successfully!" }))
  .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
};

exports.updateOne = (req, res) => {
    Message.findOne({
    where: {
      id: req.params.messageId
    }
  })
  .then(message => {
      if (!message) {
        return res.status(404).send({ message: "Message introuvable." });
      }
      
      message.update({
          message: req.body.message,
          date_envoi: req.body.date_envoi,
          fk_destinataire: req.body.fk_destinataire,
          fk_auteur: req.body.fk_auteur
      })
      .then(res.send({ message: "Message was updated successfully!" }))
        .catch(err => {
      res.status(500).send({ message: err.message });
    });
      
  });
}

exports.deleteOne = (req, res) => {
    Message.destroy({
        where : {id: req.params.messageId}
    })
    .then(res.send({message : "Message was deleted successfully"}))
}


//get All from User
exports.getAllFromDestinataire = (req, res) => {
  Message.findAll({where: {id : req.params.userId}})
    .then(function(result){
       res.status(200).send(result);
  })
};



