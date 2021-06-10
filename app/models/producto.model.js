module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("Producto", { 
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        precio: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Producto;
};