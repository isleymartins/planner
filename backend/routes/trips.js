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
//Buscar viagem em que o user é participante
router
    .route("/trips/participants")   
    .get((req, res) => tripController.getTripsParticipants(req, res));
//Buscar as informações da viagem com o id da viagem
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
//Deletar participante da viagem   
router
    .route("/trips/:id/participants/:participant")
    .delete((req, res) => tripController.removeparticipant(req, res));



module.exports = router