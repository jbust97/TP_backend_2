module.exports = (sequelize, Sequelize) => {
    const Mesa = sequelize.define("Mesa", { 
        numero: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        posicionX: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        posicionY: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        piso: {
            type: Sequelize.BIGINT,
            defaultValue: 1
        },
        capacidad: {
            type: Sequelize.BIGINT,
            allowNull: false
        },    
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Mesa;
};