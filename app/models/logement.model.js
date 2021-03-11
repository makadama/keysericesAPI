module.exports = (sequelize, Sequelize) => {
  const Logement = sequelize.define("logements", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    adresse: {
      type: Sequelize.STRING
    },
    code_postal:{
      type: Sequelize.STRING
    },
    type: {
      type : Sequelize.STRING
    },
    quartier:{
      type: Sequelize.STRING
    },
    complement:{
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    superficie: {
      type: Sequelize.FLOAT
    },
    statut: {
      type: Sequelize.BOOLEAN
    },
    prochaine_reservation: {
      type: Sequelize.DATE
    },
    nb_lits: {
      type: Sequelize.INTEGER
    },
    nb_sdb: {
       type: Sequelize.INTEGER
    },
    prix: {
       type: Sequelize.FLOAT
    }
  });

  return Logement;
};