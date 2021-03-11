module.exports = (sequelize, Sequelize) => {
  const Tache = sequelize.define("taches", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    libelle: {
      type: Sequelize.STRING
    },
    date_tache: {
      type: Sequelize.DATEONLY
    },
    heure_tache: {
      type: Sequelize.STRING
    }
  });

  return Tache;
};