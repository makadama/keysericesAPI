module.exports = {
  HOST: "eu-cdbr-west-03.cleardb.net",
  USER: "b8bd8caec9d18b",
  PASSWORD: "b33fb61c",
  PORT: "3306",
  DB: "heroku_823cdc5b4f24f70",
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
