// Importações de outros arquivos e modulos
const express = require("express");
//Politica do cors
const cors  = require("cors");
//Palavra chave
const dotenv = require("dotenv");
// Adiciona conexao com o banco de dados
const bd = require("./database/bd");
//Para criptografar senhas
//const bcrypt = require("./bcrypt");
//Gerar tokens
//const jwt = require("./jsonwebtoken");

dotenv.config();

// Inicia a conexao
bd();

// Conecta ao express
const app = express();

app.use(cors())
app.use(express.json());

//routes
const routes = require("./routes/router")

app.use("/api", routes)

// Porta do localhost
const port = process.env.PORT;

// Verifica se o banco esta rodando no express e em qual porta
app.listen(port, () => console.log(`Rodando com express na porta ${port}!`));