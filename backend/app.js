// Importações de outros arquivos e modulos
const express = require("express");
//Politica do cors
const cors  = require("cors");
//Palavra chave
const dotenv = require("dotenv");
// Adiciona conexao com o banco de dados
const bd = require("./database/bd");
//Para criptografar senhas
const bcrypt = require("./database/bcrypt");
//Gerar tokens
const jwt = require("./database/jsonwebtoken");

dotenv.config();

// Inicia a conexao
bd();

// Conecta ao express
const app = express();

app.use(cors())
app.use(express.json());
/*
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './frontEnd/asserts/Colecao')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.newFileName)
    }
})

var upload = multer({ storage: storage })

const fs = require('fs');
const path = require('path');

const criarColecao = (id) => {
    let dir = path.join(__dirname, './asserts/', id);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

}

app.post('/api/upload', upload.single('file'), function (req, res, next) {
    // req.file é o arquivo 'file' enviado
    // req.body conterá os outros campos, se houver
    res.send({ message: 'Arquivo recebido!' });
});
*/

//routes
const routes = require("./routes/router")

app.use("/api", routes)

// Porta do localhost
const port = process.env.PORT;

// Verifica se o banco esta rodando no express e em qual porta
app.listen(port, () => console.log(`Rodando com express na porta ${port}!`));