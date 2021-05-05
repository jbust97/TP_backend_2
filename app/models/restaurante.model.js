module.exports = (sequelize, Sequelize) => {
    const Restaurante = sequelize.define("Restaurante", { 
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: false
        },    
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Restaurante;
};