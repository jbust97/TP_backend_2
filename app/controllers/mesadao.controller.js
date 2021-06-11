const db = require("../models");
const Mesas = db.Mesas;
const Consumo = db.GestionesCabecera;
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

    const mesa = {
        numero: req.body.numero,
        posicionX: req.body.posicionX,
        posicionY: req.body.posicionY,
        piso: req.body.piso,
        capacidad: req.body.capacidad,
        RestauranteId: req.body.RestauranteId
    };

    // Guardamos a la base de datos
    
    Mesas.create(mesa).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha ocurrido un error al crear un mesa."
        }); 
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Mesas.findByPk(id).then(data => {     
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Not found");
        }
    }).catch(err => {
        res.status(500).send({ 
            message: "Error al obtener mesa con id=" + id
        });
    });    
};

exports.findAll = (req,res) => {
    Mesas.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todos los mesas"
        });
    });
}

exports.update = (req,res) => {
    const id = req.params.id
    const mesa = {
        numero: req.body.numero,
        posicionX: req.body.posicionX,
        posicionY: req.body.posicionY,
        piso: req.body.piso,
        capacidad: req.body.capacidad,
        RestauranteId: req.body.RestauranteId
    }
    Mesas.update(mesa, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar el mesa con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Mesas.destroy({
        where: {
            id: id
        } 
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el mesa con id: " + id);
    })
}

exports.consumo = (req,res) => {
    const id = req.params.id;
    Consumo.findOne({
        where: {
            MesaId: id,
            cerrado: false,
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send("Error al traer el consumo abierto de la mesa. Es posible que no exista");
    })
}