const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

// Ruta para el login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar usuario en la base de datos
        const user = await prisma.usuario.findUnique({
            where: { username },
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Usuario encontrado
        res.json({ 
            message: "Inicio de sesión exitoso",
            role: user.role
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
