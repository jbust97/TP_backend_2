module.exports = app => {
    const gestioncabecera = require("../controllers/gestioncabeceradao.controller.js");    
    var router = require("express").Router();
    router.post("/", gestioncabecera.create);
    router.get("/", gestioncabecera.findAll);
    router.get("/:id/ticket",gestioncabecera.ticket);
    router.get("/:id", gestioncabecera.findOne);
    router.put("/:id",gestioncabecera.update);
    router.delete("/:id",gestioncabecera.delete);
    app.use('/api/gestioncabecera', router);
};