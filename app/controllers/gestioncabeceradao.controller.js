const { sequelize} = require("../models");
const db = require("../models");
const pdf = require("html-pdf");
const { response } = require("express");
const GestionesCabecera = db.GestionesCabecera;
const GestionesDetalle = db.GestionesDetalle;
const Mesas = db.Mesas;
const ClientesDB = db.Clientes;
const Productos = db.Productos;
const RestaurantesDB = db.Restaurantes;
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
        MesaId: req.body.MesaId
        
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
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId
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

exports.ticket = async (req,res) => {
    const id = req.params.id;
    try{
        const consumo = await GestionesCabecera.findByPk(id);
        const detalles = await GestionesDetalle.findAll({where: {GestionCabeceraId: id}});
        const cliente = await ClientesDB.findByPk(consumo.ClienteId);
        const mesa = await Mesas.findByPk(consumo.MesaId);
        const restaurante = await RestaurantesDB.findByPk(mesa.RestauranteId);
        for (let i = 0; i < detalles.length; i++){
            let producto = await Productos.findByPk(detalles[i].dataValues.ProductoId)
            detalles[i].dataValues.producto = producto;
        }
        let  date = consumo.cierre;
        console.log(consumo)
        console.log("cierre")
        console.log(date)
        let fecha = "";
        if (date){
            fecha =  ("00" + date.getDate()).slice(-2) + "/" +
            ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2);
        }
        let html =  `
            <div>
                <h1>${restaurante.nombre}</h1>
                <span>${restaurante.direccion}</span>
                <hr/>
                <span>Cliente: ${cliente.nombre} ${cliente.apellido}</span><br/>
                <span>Documento: ${cliente.cedula}</span><br/>
                <span>${fecha}<span/>
                <hr/>
                <span>Nº Mesa: ${mesa.numero}</span><br/>
                <h5>Detalles</h5>
                ${
                    detalles.reduce((acc,cur)=>{
                        let result = acc + "<br/>";
                        result += "<h6>" + cur.dataValues.producto.dataValues.nombre + "</h6>";
                        result += "Cantidad: " + cur.dataValues.cantidad + "<br/>";
                        result += "Costo Unitario: " + cur.dataValues.producto.dataValues.precio + "<br/>";
                        result += "Costo total: " + cur.dataValues.producto.dataValues.precio * cur.dataValues.cantidad + "<br/>";
                        result += "<hr style=\"border: 1px dashed black;\" />"
                        return result;
                    },"")
                }
                <span>Total: ${consumo.total}</span> 
            </div>
         `
        pdf.create(html,{"width":"8in"}).toStream((err,stream)=>{
            res.setHeader('Content-Type','application/pdf');
            res.setHeader('Content-Disposition','attachment; filename=ticket.pdf');
            stream.pipe(res);
        });
    }
    catch(e){
        console.log(e);
    }
}