module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("Categoria", { 
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },  
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Categoria;
};