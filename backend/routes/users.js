const router = require("express").Router();

const userController = require("../controllers/userController");

//Registrar usuario no sistema
router
    .route("/register")
    .post((req, res) => userController.create(req, res));
//Logar no sistema
router
    .route("/login")
    .post((req, res) => userController.login(req, res));
router
    .route("/validate")
    .post(userController.checkToken,(req, res) => userController.get(req, res));
//ver todos os usuarios
router
    .route("/user")
    .get((req, res) => userController.getAll(req, res));
router
    .route("/user/:id")
    .get(userController.checkToken,(req, res) => userController.get(req, res));
router
    .route("/user/:id")
    .delete((req, res) => userController.delete(req, res));
router
    .route("/user/:id")
    .put((req, res) => userController.update(req, res));
module.exports = router