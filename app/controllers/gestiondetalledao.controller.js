const { sequelize } = require("../models");
const db = require("../models");
const GestionesCabecera = db.GestionesCabecera;
const GestionesDetalle = db.GestionesDetalle;
const Op = db.Sequelize.Op;

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

    const detalle = {
        cantidad: req.body.cantidad,
        GestionCabeceraId: req.body.GestionCabeceraId,
        ProductoId: req.body.ProductoId
    };

    // Guardamos a la base de datos
    
    GestionesDetalle.create(detalle).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha ocurrido un error al crear un detalle."
        }); 
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    GestionesDetalle.findByPk(id).then(data => {     
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Not found");
        }
    }).catch(err => {
        res.status(500).send({ 
            message: "Error al obtener detalle con id=" + id
        });
    });    
};

exports.findAll = (req,res) => {
    GestionesDetalle.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todos los detalles"
        });
    });
}

exports.update = (req,res) => {
    const id = req.params.id
    const detalle = {
        cantidad: req.body.cantidad,
        GestionCabeceraId: req.body.GestionCabeceraId,
        ProductosId: req.body.ProductosId
    }
    GestionesDetalle.update(detalle, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar el detalle con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    GestionesDetalle.destroy({
        where: {
            id: id
        } 
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el detalle con id: " + id);
    })
}

exports.consulta = (req, res) => {
    const gcId = req.query.cabeceraId;

    if (gcId == null) res.status(500).send({message: "Error al obtener todos los detalles"});

    GestionesDetalle.findAll({
        where: {
            GestionCabeceraId: gcId,
        },
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener los detalles"
        });
    });
}