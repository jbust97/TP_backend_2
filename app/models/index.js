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
db.Categorias = require("./categoria.model.js")(sequelize, Sequelize);
db.Productos = require("./producto.model.js")(sequelize, Sequelize);
db.GestionesCabecera = require("./gestioncabecera.model.js")(sequelize, Sequelize);
db.GestionesDetalle = require("./gestiondetalle.model.js")(sequelize, Sequelize);

db.Restaurantes.hasMany(db.Mesas);
db.Mesas.belongsTo(db.Restaurantes);
db.Restaurantes.hasMany(db.Reservas);
db.Reservas.belongsTo(db.Restaurantes);
db.Mesas.hasMany(db.Reservas);
db.Reservas.belongsTo(db.Mesas);
db.Clientes.hasMany(db.Reservas);
db.Reservas.belongsTo(db.Clientes);
db.Categorias.hasMany(db.Productos);
db.Productos.belongsTo(db.Categorias);
db.GestionesCabecera.hasMany(db.GestionesDetalle);
db.GestionesDetalle.belongsTo(db.GestionesCabecera);
db.Productos.hasMany(db.GestionesDetalle);
db.GestionesDetalle.belongsTo(db.Productos);
db.GestionesCabecera.belongsTo(db.Mesas);
db.Mesas.hasMany(db.GestionesCabecera);
db.GestionesCabecera.belongsTo(db.Clientes);
db.Clientes.hasMany(db.GestionesCabecera);

module.exports = db;