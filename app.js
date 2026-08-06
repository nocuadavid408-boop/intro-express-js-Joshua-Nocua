require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (_, res) => {
  res.send("Hola , estamos aprendiendo express con la ficha 3407184");
});
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: ${port}`);
});

app.get("/datos", (_, res) => {
  res.json({
    datospersonales: {
      nombre: "Joshua",
      apellido: "Nocua",
      lista_telefonos:[312567890, 
        3123456789],
    },
    datosprograma: {
      nombre_programa: "Analisis y Desarrollo de Software",
      tipo_programa: "Tecnologo",
      ficha: 3407184,
    }
  });
});