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

    const cabecera = {
        cerrado: req.body.cerrado,
        total: req.body.total,
        creacion: req.body.creacion,
        cierre: req.body.cierre,
    };

    // Guardamos a la base de datos
    
    GestionesCabecera.create(cabecera).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha ocurrido un error al crear una cabecera."
        }); 
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    GestionesCabecera.findByPk(id).then(data => {     
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Not found");
        }
    }).catch(err => {
        res.status(500).send({ 
            message: "Error al obtener cabecera con id=" + id
        });
    });    
};

exports.findAll = (req,res) => {
    GestionesCabecera.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todas las cabeceras"
        });
    });
}

exports.update = (req,res) => {
    const id = req.params.id
    const cabecera = {
        cerrado: req.body.cerrado,
        total: req.body.total,
        creacion: req.body.creacion,
        cierre: req.body.cierre,
    }
    GestionesCabecera.update(cabecera, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar la cabecera con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    GestionesCabecera.destroy({
        where: {
            id: id
        } 
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar la cabecera con id: " + id);
    })
}