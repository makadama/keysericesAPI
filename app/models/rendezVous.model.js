module.exports = (sequelize, Sequelize) => {
  const RendezVous = sequelize.define("rendezVous", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type_rdv:{
      type: Sequelize.STRING
    },
    date_rdv: { 
      type: Sequelize.DATEONLY
    },
    heure_rdv:{
      type: Sequelize.STRING
    }
  });

  return RendezVous;
};