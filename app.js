const express = require('express');
const app = express();
const port = 3000;

app.get("/", function(req, res) {
  res.send("Hola , estamos aprendiendo express con la ficha 3407184");
})

app.get("/aprendices", (req, res) => {
  const listaAprendices = [
    {"nombre": "Juan Camilo", 
      "edad": 20, 
      "correo": "juan.camilo@gmail.com",
      "imgperfil": "url_img_1"
    },
    {"nombre": "Maria lucia", 
      "edad": 22, 
      "correo": "maria.lucia@gmail.com",
      "imgperfil": "url_img_2"
    },
    {"nombre": "Carlos Andres", 
      "edad": 21, 
      "correo": "carlos.andres@gmail.com",
      "imgperfil": "url_img_3"
    }
  ]
  res.json(listaAprendices);
});

app.listen(port, function() {
  console.log(`SERVIDOR: http://localhost: ${port}`);
})