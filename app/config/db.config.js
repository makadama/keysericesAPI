module.exports = {
  HOST: process.env.HOST_DB,
  USER: process.env.USER_DB,
  PASSWORD: process.env.PASSWORD_DB,
  PORT: process.env.PORT_DB,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


/*module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  PORT: "3306",
  DB: "ks",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};*/
