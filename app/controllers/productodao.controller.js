const db = require("../models");
const Productos = db.Productos;
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

    const producto = {
        nombre: req.body.nombre,
        CategoriumId: req.body.CategoriumId,
        precio: req.body.precio
    };

    // Guardamos a la base de datos
    
    Productos.create(producto).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha ocurrido un error al crear una producto."
        }); 
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Productos.findByPk(id).then(data => {     
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Not found");
        }
    }).catch(err => {
        res.status(500).send({ 
            message: "Error al obtener producto con id=" + id
        });
    });    
};

exports.findAll = (req,res) => {
    Productos.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todos los productos"
        });
    });
}

exports.update = (req,res) => {
    const id = req.params.id
    const producto = {
        nombre: req.body.nombre,
        CategoriumId: req.body.CategoriumId,
        precio: req.body.precio
    }
    Productos.update(producto, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar el producto con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Productos.destroy({
        where: {
            id: id
        } 
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el producto con id: " + id);
    })
}