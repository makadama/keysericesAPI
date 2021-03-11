module.exports = (sequelize, Sequelize) => {
  const Employe = sequelize.define("employes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    lastname: {
      type: Sequelize.STRING
    },
    firstname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    adress: {
      type: Sequelize.STRING
    },
    telephone: {
      type: Sequelize.STRING
    },
    role: {
       type: Sequelize.STRING
    }
  });

  return Employe;
};