const db = require("../models");
const Categorias = db.Categorias;
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

    const categoria = {
        nombre: req.body.nombre,
        
    };

    // Guardamos a la base de datos
    
    Categorias.create(categoria).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Ha ocurrido un error al crear una categoria."
        }); 
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Categorias.findByPk(id).then(data => {     
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send("Not found");
        }
    }).catch(err => {
        res.status(500).send({ 
            message: "Error al obtener categoria con id=" + id
        });
    });    
};

exports.findAll = (req,res) => {
    Categorias.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener todos las categorias"
        });
    });
}

exports.update = (req,res) => {
    const id = req.params.id
    const categoria = {
        nombre: req.body.nombre,
        
    }
    Categorias.update(categoria, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al actualizar el categoria con id: " + id
        })
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Categorias.destroy({
        where: {
            id: id
        } 
    }).then(data => {
        res.status(204).send();
    }).catch(err => {
        res.status(500).send("Error al eliminar el categoria con id: " + id);
    })
}