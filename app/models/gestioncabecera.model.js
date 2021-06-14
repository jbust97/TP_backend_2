module.exports = (sequelize, Sequelize) => {
    const GestionCabecera = sequelize.define("GestionCabecera", { 
        cerrado: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        total: {
            type: Sequelize.BIGINT,
            defaultValue: 0,
            allowNull: false
        },
        creacion: {
            type: Sequelize.DATE,
            allowNull: false
        },
        cierre: {
            type: Sequelize.DATE,
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return GestionCabecera;
};