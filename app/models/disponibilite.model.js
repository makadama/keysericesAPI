module.exports = (sequelize, Sequelize) => {
  const Disponibilite = sequelize.define("disponibilites", {
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

  return Disponibilite;
};