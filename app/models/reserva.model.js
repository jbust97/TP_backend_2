module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define("Reserva", { 
        fecha: {
            type: Sequelize.DATE,
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