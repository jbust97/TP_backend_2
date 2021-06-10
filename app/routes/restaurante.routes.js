module.exports = app => {
    const restaurante = require("../controllers/restaurantedao.controller.js");    
    var router = require("express").Router();
    router.post("/", restaurante.create);
    router.get("/", restaurante.findAll);
    router.get("/:id", restaurante.findOne);
    router.put("/:id",restaurante.update);
    router.delete("/:id",restaurante.delete);
    router.get("/:id/mesas",restaurante.mesas); 
    router.get("/:id/horario",restaurante.consultaHorarios);
    
    app.use('/api/restaurante', router);
    
};