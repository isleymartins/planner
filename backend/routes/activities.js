const router = require("express").Router();

const activitiesController = require("../controllers/activitiesController")

router
    .route("/activities")
    .post((req, res) => activitiesController.create(req, res));
router
    .route("/activities")
    .get((req, res) => activitiesController.getAll(req, res));
router
    .route("/activities/:id")
    .get((req, res) => activitiesController.get(req, res));
router
    .route("/activities/:id")
    .delete((req, res) => activitiesController.delete(req, res));
router
    .route("/activities/:id")
    .put((req, res) => activitiesController.update(req, res));
//Activity

router
    .route("/activities/:id/activity")
    .post((req, res) => activitiesController.createActivity(req, res));
router
    .route("/activities/:id/activity")
    .get((req, res) => activitiesController.getAllActivity(req, res));
router
    .route("/activities/:id/activity/:activityId")
    .get((req, res) => activitiesController.getActivity(req, res));
router
    .route("/activities/:id/activity/:activityId")
    .delete((req, res) => activitiesController.deleteActivity(req, res));
router
    .route("/activities/:id/activity/:activityId")
    .put((req, res) => activitiesController.updateActivity(req, res));
module.exports = router