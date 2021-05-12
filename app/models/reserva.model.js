var moment = require('moment');
module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define("Reserva", { 
        fecha: {
            type: Sequelize.DATEONLY,
            get: function() {
              return moment.utc(this.getDataValue('fecha')).format('YYYY-MM-DD');
            },
            allowNull: false
        },
        horaInicio: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        horaFin: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Reserva;
};