const { User: UserModel } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userController = {

    create: async (req, res) => {
        try {
            const user = {
                user: req.body.user,
                email: req.body.email,
                password: req.body.password
            };
            if (!user.user) {
                return res.status(422).json({ msg: "Nome do usuário é obrigatório" });
            }
            if (!user.email) {
                return res.status(422).json({ msg: "O email é obrigatório" });
            }
            if (!user.password) {
                return res.status(422).json({ msg: "A senha é obrigatória" });
            }
            if (user.password.length < 3) {
                return res.status(422).json({ msg: "A senha é muito curta" });
            }
            const userExists = await UserModel.findOne({ email: user.email });
            if (userExists) {
                return res.status(422).json({ msg: "Já existe um cadastro com este email" });
            }

            // criar password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(user.password, salt);

            // criar user
            user.password = passwordHash;

            const newUser = await UserModel.create(user);
            return res.status(201).json({ newUser, msg: "Criado com sucesso!" });
        } catch (error) {
            return res.status(500).json({ msg: "Erro no servidor", error: error.message });
        }
    },
    get: async (req, res) => {
        const id = req.body.id
        // checa se  usuario existe
        const user = await UserModel.findById(id, "-password");

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        res.status(200).json({
            id: user._id,
            user: user.user,
            email: user.email
        } );
    },
    checkToken: (req, res, next) => {
        const token = req.body.token
        /*const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];*/

        if (!token) return res.status(401).json({ msg: "Acesso negado!" });

        try {
            const secret = process.env.SECRET;
            const result = jwt.verify(token, secret);
            req.body.id = result.id
            next();
        } catch (err) {
            res.status(400).json({ msg: "O Token é inválido!" });
        }
    },
    getAll: async (req, res) => {
        try {
            const user = await UserModel.find({}, "-password");
            return res.status(200).json(user)
        } catch (error) {
            return console.log(error)

        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(422).json({ msg: "O email é obrigatório" });
            }
            if (!password) {
                return res.status(422).json({ msg: "A senha é obrigatória" });
            }

            const userExists = await UserModel.findOne({ email });
            
            if (!userExists) {
                return res.status(422).json({ msg: "Não existe um cadastro com este email" });
            }

            const checkPassword = await bcrypt.compare(password, userExists.password);
            if (!checkPassword) {
                return res.status(422).json({ msg: "Senha inválida!" });
            }

            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    id: userExists._id,
                },
                secret
            );

            return res.status(200).json({ msg: "Autenticação realizada com sucesso!", token, user: userExists });

        } catch (error) {
            return res.status(500).json({ msg: "Erro no servidor", error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({ msg: "Não encontrado!" })

            }
            const deleteduser = await UserModel.findByIdAndDelete(id)
            return res.status(200).json({ deleteduser, msg: "Usuario excluido com sucesso!" })
        } catch (error) {
            return console.log(error)

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
                return res.status(404).json({ msg: "Não encontrado!" })
            }
            return res.status(201).json({ user, msg: "Usuario Atualizado!" })
        } catch (error) {
            return console.log(error)

        }
    },
}
module.exports = userController