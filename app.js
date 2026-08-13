import express from 'express';
// import {configDotenv} from "dotenv"
// configDotenv();
import "dotenv/config" 
import cors from "cors";
import bodyparser from "body-parser";

const app = express();
const port = 3000;
app.get("/", (_, res) => {
  res.send("Hola , estamos aprendiendo express con la ficha 3407184");
});
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: ${port}`);
});