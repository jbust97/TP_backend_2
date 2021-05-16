const db = require("../models");
const Restaurantes = db.Restaurantes;
const Mesas = db.Mesas;
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

    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
    };

    // Guardamos a la base de datos
    
    Restaurantes.create(restaurante).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha ocurrido un error al crear un restaurante."
        }); 
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurantes.findByPk(id).then(data => {     
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Not found");
        }
    }).catch(err => {
        res.status(500).send({ 
            message: "Error al obtener restaurante con id=" + id
        });
    });    
};

exports.findAll = (req,res) => {
    Restaurantes.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todos los restaurantes"
        });
    });
}

exports.update = (req,res) => {
    const id = req.params.id
    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    }
    Restaurantes.update(restaurante, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar el restaurante con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Restaurantes.destroy({
        where: {
            id: id
        } 
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el restaurante con id: " + id);
    })
}

exports.consultaHorarios = async (req, res) => {
    const rId = req.params.id;
    const f = moment.utc(req.query.fecha).format('YYYY-MM-DD');
    const cap = req.query.capacidad;
    const mesas = await Mesas.findAll({
        where: {
            RestauranteId: rId,
            capacidad: {[Op.gte]: cap},
        }
    });
    for(let i=0; i<mesas.length; i++){
        mesas[i].dataValues.disponibilidad = {12:true,13:true,14:true,15:true, 
                                              16:true,17:true,18:true,19:true,
                                              20:true,21:true,22:true};
        const reservas = await Reservas.findAll({
            where: {
                MesaId: mesas[i].dataValues.id,
                fecha: f
            }
        });
        //console.log(reservas);
        for(let j=0; j<reservas.length; j++){
            let hIni = reservas[j].dataValues.horaInicio;
            let hFin = reservas[j].dataValues.horaFin;
            for(let k=0; k<(hFin-hIni); k++){
                let horaActual = parseInt(hIni)+parseInt(k);
                mesas[i].dataValues.disponibilidad[horaActual] = false;
            }
        }
    }
    //console.log(mesas[0].dataValues.disponibilidad);
    try{
        res.send(mesas);
    }catch(e){
        res.status(404).send("No se encuentra");
    }
}