const db = require("../models");
const Clientes = db.Clientes;
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

    const cliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula
    };

    // Guardamos a la base de datos
    
    Clientes.create(cliente).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha ocurrido un error al crear un cliente."
        }); 
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Clientes.findByPk(id).then(data => {     
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Not found");
        }
    }).catch(err => {
        res.status(500).send({ 
            message: "Error al obtener cliente con id=" + id
        });
    });    
};

exports.findAll = (req,res) => {
    Clientes.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todos los clientes"
        });
    });
}

exports.update = (req,res) => {
    const id = req.params.id
    const cliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula
    }
    Clientes.update(cliente, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar el cliente con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Clientes.destroy({
        where: {
            id: id
        } 
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el cliente con id: " + id);
    })
}