module.exports = (sequelize, Sequelize) => {
    const GestionDetalle = sequelize.define("GestionDetalle", { 
        cantidad: {
            type: Sequelize.BIGINT,
            defaultValue: 1,
            allowNull: false
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return GestionDetalle;
};