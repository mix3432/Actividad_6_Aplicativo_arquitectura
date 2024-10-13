const express = require('express');
const path = require('path');
const recyclingRoutes = require('./routes/recyclingRoutes');
const forumRoutes = require('./routes/forumRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/api/recycling', recyclingRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
