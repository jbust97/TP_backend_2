module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", { 
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        },    
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        cedula: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
    return Cliente;
};