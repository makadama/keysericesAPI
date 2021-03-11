module.exports = (sequelize, Sequelize) => {
  const Etat_logement = sequelize.define("etats_logement", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    etat: {
      type: Sequelize.STRING
    }
  });

  return Etat_logement;
};