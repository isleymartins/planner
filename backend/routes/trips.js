const router = require("express").Router();

const tripController = require("../controllers/tripController");

//Criar viagem
router
    .route("/trips")
    .post((req, res) => tripController.create(req, res));

//Buscar todas as viagens com email
router
    .route("/trips")
    .get((req, res) => tripController.getAll(req, res));
//Buscar viagem especifica
router
    .route("/trips/:id")
    .get((req, res) => tripController.get(req, res));
//Deletar viagem    
router
    .route("/trips/:id")
    .delete((req, res) => tripController.delete(req, res));
//Atualizar viagem
router
    .route("/trips/:id")
    .put((req, res) => tripController.update(req, res));
module.exports = router