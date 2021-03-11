module.exports = (sequelize, Sequelize) => {
  const Annonce = sequelize.define("annonces", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date_debut: {
      type: Sequelize.DATEONLY
    },
    date_fin: {
      type: Sequelize.DATEONLY
    }
  });

  return Annonce;
};