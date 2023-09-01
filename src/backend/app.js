const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar mongoose y definir el modelo de datos
mongoose.connect('mongodb://localhost:27017/tracking-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const packageSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: Date,
});

const Package = mongoose.model('Package', packageSchema);

// Configurar rutas para API REST
const routes = require('./routes.js');
app.use('/api', routes);

// Configurar Socket.io para actualizaciones en tiempo real
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Lógica para manejar actualizaciones en tiempo real y emitir eventos
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
