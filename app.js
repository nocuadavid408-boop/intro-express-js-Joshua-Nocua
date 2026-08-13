const express = require('express');  
const app = express();  
const port = 3000; 

app.use(express.json());
app.set('case sensitive routing', false);

const listaPersonas = [
    {
        "id": 1,
        "nombre": "Juan Camilo",
        "edad": 21,
        "correo": "juan.camilo@gmail.com",
        "imgPerfil": "url_img_1"
    },
    {
        "id": 2,
        "nombre": "Maria lucia",
        "edad": 19,
        "correo": "maria.lucia@gmail.com",
        "imgPerfil": "url_img_2"
    },
    {
        "id": 3,
        "nombre": "Carlos Andres",
        "edad": 24,
        "correo": "carlos.andres@gmail.com",
        "imgPerfil": "url_img_3"
    }
];

// Ruta raíz
app.get("/", (req, res) => { 
    res.send("Hola, estamos aprendiendo express con la ficha 3407184"); 
});  

// Obtener todos los aprendices
app.get("/aprendices", (req, res) => {
    res.json(listaPersonas);
});

// Búsqueda por nombre
app.get("/aprendices/nombre/:nombreRecibido", (req, res) => {
    const nombreBuscado = req.params.nombreRecibido.toLowerCase();
    const aprendizEncontrado = listaPersonas.find(
        p => p.nombre.toLowerCase() === nombreBuscado
    );

    if (!aprendizEncontrado) {
        return res.status(404).json({ 
            error: "Aprendiz no encontrado",
            mensaje: `No se encontró a nadie llamado '${req.params.nombreRecibido}'`
        });
    }

    res.json(aprendizEncontrado);
});

// Búsqueda por ID
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

// Crear nuevo aprendiz
app.post("/aprendices", (req, res) => {
    const { nombre, edad, correo, imgPerfil } = req.body;

    // Validación del nombre
    if (!nombre || nombre.trim().length < 3) {
        return res.status(400).json({
            error: "Validación fallida",
            mensaje: "El nombre es obligatorio y debe tener al menos 3 caracteres."
        });
    }

    // Validación exclusiva para direcciones de Gmail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!correo || !emailRegex.test(correo.trim().toLowerCase())) {
        return res.status(400).json({
            error: "Validación fallida",
            mensaje: "El correo electrónico debe ser una cuenta válida de Gmail (ejemplo@gmail.com)."
        });
    }

    // Validación de correo único
    const correoFormateado = correo.trim().toLowerCase();
    const existeCorreo = listaPersonas.some(p => p.correo === correoFormateado);
    if (existeCorreo) {
        return res.status(400).json({
            error: "Validación fallida",
            mensaje: "El correo ingresado ya está registrado."
        });
    }

    // Generación de ID y estructura del nuevo registro
    const nuevoId = listaPersonas.length > 0 ? listaPersonas[listaPersonas.length - 1].id + 1 : 1;
    const nuevoAprendiz = {
        id: nuevoId,
        nombre: nombre.trim(),
        edad: parseInt(edad) || 0,
        correo: correoFormateado, 
        imgPerfil: imgPerfil || ""
    };

    listaPersonas.push(nuevoAprendiz);
    res.status(201).json({
        "mensaje": "aprendiz creado exitosamente",
        "Datos": nuevoAprendiz
    });
});

app.listen(port, () => { 
    console.log(`Servidor en funcionamiento en: http://localhost:${port}`); 
});