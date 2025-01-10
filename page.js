const express = require('express');
const cors = require('cors');
const app = express();
const indexRouter = require('./routes/indexRouter.js');

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
}));

// Rutas
app.use('/api', indexRouter);

// Puerto en que se ejecuta el servidor
const port = process.env.PORT || 5000;

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
