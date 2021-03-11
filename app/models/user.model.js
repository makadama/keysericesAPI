module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
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
    type: {
       type: Sequelize.STRING
    },
    tokenPassword:{
      type: Sequelize.STRING
    }
  });

  return User;
};