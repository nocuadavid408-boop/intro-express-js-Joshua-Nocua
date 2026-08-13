const express = require('express');  
const app = express();  
const port = 3000; 


app.set('case sensitive routing', false);


const listaPersonas = [
    {
        "id": 1,
        "nombre": "Juan Camilo",
        "edad": 21,
        "correo": "juan.camilo@gmail.com",
        "imgPerfil": ""
    },
    {
        "id": 2,
        "nombre": "Mara lucia",
        "edad": 19,
        "correo": "maria.lucia@gmail.com",
        "imgPerfil": ""
    },
    {
        "id": 3,
        "nombre": "Carlos Andres",
        "edad": 24,
        "correo": "carlos.andres@gmail.com",
        "imgPerfil": ""
    }
];


app.get("/", (req, res) => { 
    res.send("Hola, estamos aprendiendo express con la ficha 3407184"); 
});  


app.get("/aprendices", (req, res) => {
    res.json(listaPersonas);
});


app.get("/aprendices/:id", (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const aprendiz = listaPersonas.find(p => p.id === idBuscado);

    if (!aprendiz) {
        return res.status(404).json({ 
            error: "Aprendiz no encontrado",
            mensaje: `No existe ningún registro con el ID ${idBuscado}`
        });
    }

    res.json(aprendiz);
});

app.get("/aprendices/nombre/:nombreRecibido", (req, res) => {
    const nombreBuscado = req.params.nombreRecibido;
    const aprendizEncontrado = listaPersonas.find(
        p => p.nombre.toLowerCase() === nombreBuscado.toLowerCase()
    );

    if (!aprendizEncontrado) {
        return res.status(404).json({ 
            error: "Aprendiz no encontrado",
            mensaje: `No se encontró a nadie llamado '${nombreBuscado}'`
        });
    }

    res.json(aprendizEncontrado);
});


app.listen(port, () => { 
    console.log(`Servidor en funcionamiento en: http://localhost:${port}`); 
});
