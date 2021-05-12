const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {

    max: dbConfig.pool.max,

    min: dbConfig.pool.min,

    acquire: dbConfig.pool.acquire,

    idle: dbConfig.pool.idle
}
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Restaurantes = require("./restaurante.model.js")(sequelize, Sequelize);
db.Clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.Mesas = require("./mesa.model.js")(sequelize, Sequelize);
db.Reservas = require("./reserva.model.js")(sequelize, Sequelize);

db.Restaurantes.hasMany(db.Mesas);
db.Mesas.belongsTo(db.Restaurantes);
db.Restaurantes.hasMany(db.Reservas);
db.Reservas.belongsTo(db.Restaurantes);
db.Mesas.hasMany(db.Reservas);
db.Reservas.belongsTo(db.Mesas);
db.Clientes.hasMany(db.Reservas);
db.Reservas.belongsTo(db.Clientes);
module.exports = db;