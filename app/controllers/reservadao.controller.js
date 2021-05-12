const { sequelize } = require("../models");
const db = require("../models");
const Reservas = db.Reservas;
const Op = db.Sequelize.Op;
var moment = require('moment');

exports.create = (req, res) => {
    // Validate request
    /*if (!req.body.factura) {
        res.status(400).send({
            message: "Debe enviar numero de factura!"
        });
        return;
    }
    */
    // crea una venta

    const reserva = {
        fecha: req.body.fecha,
        horaInicio: req.body.horaInicio,
        horaFin: req.body.horaFin,
        RestauranteId: req.body.RestauranteId,
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId
    };

    // Guardamos a la base de datos
    
    Reservas.create(reserva).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha ocurrido un error al crear una reserva."
        }); 
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Reservas.findByPk(id).then(data => {     
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Not found");
        }
    }).catch(err => {
        res.status(500).send({ 
            message: "Error al obtener reserva con id=" + id
        });
    });    
};

exports.consulta = (req, res) => {
    const rId = req.query.RestauranteId;
    const f = moment.utc(req.query.fecha).format('YYYY-MM-DD');
    const cId = req.query.ClienteId;

    if (rId == null || f == null) res.status(500).send({message: "Error al obtener todas las reservas"});

    if (cId == null){
        Reservas.findAll({
            where: {
                RestauranteId: rId,
                fecha: f,
            }
        }).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: "Error al obtener las reservas"
            });
        });
    }else{
        Reservas.findAll({
            where: {
                RestauranteId: rId,
                fecha: f,
                ClienteId: cId
            }
        }).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: "Error al obtener las reservas"
            });
        });
    }
}

exports.findAll = (req,res) => {
    Reservas.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todas las reservas"
        });
    });
}

exports.update = (req,res) => {
    const id = req.params.id
    const reserva = {
        fecha: req.body.fecha,
        horaInicio: req.body.horaInicio,
        horaFin: req.body.horaFin,
        RestauranteId: req.body.RestauranteId,
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId
    }
    Reservas.update(reserva, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar la reserva con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Reservas.destroy({
        where: {
            id: id
        } 
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar la reserva con id: " + id);
    })
}