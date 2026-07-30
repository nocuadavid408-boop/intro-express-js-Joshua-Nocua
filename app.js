import express from 'express';
// import {configDotenv} from "dotenv"
// configDotenv();
import "dotenv/config" 
import bodyparser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

//configurar el uso de body-parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", (_, res) => {
  res.send(`Hola , estamos aprendiendo express con la ficha 3407184`);
});

//otro endopint, funcione de flecha
app.get("/productos", (req,res) => {
  //usando templates strings
  res.send(`<h1>listado de productos</h1>
    <ol>
      <li>televisor</li>
      <li>celular</li>
      <li>impresora</li>
    </ol>`);
});

app.get("/productos/:nombres", (req,res) => {
    const producto = req.params.nombres
    res.send(`El prodcuto es ${producto}`);
})

//1. nombres
app.get("/saludo/:nombre", (req,res) => {
  const {nombre} = req.params;
   if (nombre.length < 3) {
    return res.status(400).json({
      error: "El nombre debe tener al menos 3 caracteres"});
  }
  res.send(`Hola, ${nombre} bienvenido`);
})




app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: ${port}`);
});