var moment = require('moment');
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
            type: Sequelize.DATEONLY,
            get: function() {
              return moment.utc(this.getDataValue('creacion')).format('YYYY-MM-DD');
            },
            allowNull: false
        },
        cierre: {
            type: Sequelize.DATEONLY,
            get: function() {
              return moment.utc(this.getDataValue('cierre')).format('YYYY-MM-DD');
            },
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return GestionCabecera;
};