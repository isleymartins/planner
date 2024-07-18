const mongoose = require("mongoose");


const main = async () => {
  try {
    mongoose.set("strictQuery",true);
    await mongoose.connect(
      /*`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@pokedeck.csbmfzx.mongodb.net/?retryWrites=true&w=majority`*/
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@pokedeck.csbmfzx.mongodb.net/planner?retryWrites=true&w=majority`
      );
    console.log("Conexao com banco de dados realizada com sucesso!")
  }
  catch(error) {
    console.log( "Ocorreu um erro ao se conectar com o banco de dados: ",error)

  }
}
module.exports = main;
