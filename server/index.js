// Servidor (Backend): Creación de APIs
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute")

const app = express();
require("dotenv").config()

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

// Rutas
app.get("/", (req, res) => {
    res.send("Bienvenido al Chat");
});

// process.env.PORT -> Me otorga un puerto de forma automatica según el puerto disponible
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
    console.log(`Servidor ejecutandose en el puerto: ${port}`);
})

mongoose
    .connect(uri, {
        useNewURLParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Conexión establecida con MongoDB"))
    .catch((error) => console.log("Conexión fallida con MongoDB:  ", error.message))