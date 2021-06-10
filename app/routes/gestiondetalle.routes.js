module.exports = app => {
    const gestiondetalle = require("../controllers/gestiondetalledao.controller.js");    
    var router = require("express").Router();
    router.post("/", gestiondetalle.create);
    router.get("/", gestiondetalle.findAll);
    router.get("/consulta", gestiondetalle.consulta);
    router.get("/:id", gestiondetalle.findOne);
    router.put("/:id",gestiondetalle.update);
    router.delete("/:id",gestiondetalle.delete);
    app.use('/api/gestiondetalle', router);
};