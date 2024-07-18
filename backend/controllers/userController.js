const { User: UserModel } = require("../models/User");

const userController = {

    create: async (req, res) => {
        try {
            const user = {
                user: req.body.user,
                email: req.body.email,
                password: req.body.password
            };

            const response = await UserModel.create(user);
            res.status(201).json({ response, msg: "Criado com sucesso!" })
        } catch (error) {
            console.log(error)

        }
    },
    getAll: async (req, res) => {
        try {
            const user = await UserModel.find();
            res.status(200).json(user)
        } catch (error) {
            console.log(error)

        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id
            const user = await UserModel.findById(id);
            if (!user) {
                res.status(404).json({ msg: "Não encontrado!" })
                return
            }
            res.json(user)
        } catch (error) {
            console.log(error)

        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const user = await UserModel.findById(id);
            if (!user) {
                res.status(404).json({ msg: "Não encontrado!" })
                return
            }
            const deleteduser = await UserModel.findByIdAndDelete(id)
            res.status(200).json({ deleteduser, msg: "Usuario excluido com sucesso!" })
        } catch (error) {
            console.log(error)

        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const user = {
                user: req.body.user,
                password: req.body.password
            };
            const Updateduser = await UserModel.findByIdAndUpdate(id, user);
            if (!Updateduser) {
                res.status(404).json({ msg: "Não encontrado!" })
                return
            }
            res.status(200).json({ user, msg: "Usuario Atualizado!" })
        } catch (error) {
            console.log(error)

        }
    },
}
module.exports = userController