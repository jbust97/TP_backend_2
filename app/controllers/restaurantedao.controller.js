const db = require("../models");
const Restaurantes = db.Restaurantes;
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