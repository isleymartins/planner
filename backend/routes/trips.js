const router = require("express").Router();

const tripController = require("../controllers/tripController");

router
    .route("/trips")
    .post((req, res) => tripController.create(req, res));
router
    .route("/trips")
    .get((req, res) => tripController.getAll(req, res));
router
    .route("/trips/:id")
    .get((req, res) => tripController.get(req, res));
router
    .route("/trips/:id")
    .delete((req, res) => tripController.delete(req, res));
router
    .route("/trips/:id")
    .put((req, res) => tripController.update(req, res));
module.exports = router