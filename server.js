const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Një rrugë (route) e thjeshtë HTTP për të verifikuar që serveri punon
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// Menaxhimi i lidhjeve Socket.io
io.on('connection', (socket) => {
  console.log('Një përdorues u lidh me ID:', socket.id);

  // Menaxhimi i shkëputjes së përdoruesit
  socket.on('disconnect', () => {
    console.log('Përdoruesi u shkëput:', socket.id);
  });
});

// Nisja e serverit
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveri po dëgjon në http://localhost:${PORT}`);
});
io.on('connection', (socket) => {
  console.log('Një përdorues u lidh me ID:', socket.id);

  // Dëgjojmë për eventin 'pershendetje' nga klienti
  socket.on('pershendetje', (mesazhi) => {
    console.log('Mesazh i marrë nga klienti:', mesazhi);

    // Ia kthejmë një përgjigje po këtij klienti
    socket.emit('pergjigje_nga_serveri', 'E mora mesazhin tënd me sukses!');
  });

  socket.on('disconnect', () => {
    console.log('Përdoruesi u shkëput:', socket.id);
  });
});
io.on('connection', (socket) => {
  console.log('Një përdorues u lidh me ID:', socket.id);

  // Dëgjojmë për ngjarjen 'mesazh_chat' nga çdo klient
  socket.on('mesazh_chat', (msg) => {
    // Kujdes këtu: Përdorim io.emit() në vend të socket.emit()
    // io.emit ia dërgon mesazhin TË GJITHË klientëve të lidhur (përfshirë atë që e dërgoi)
    io.emit('mesazh_chat', msg);
  });

  socket.on('disconnect', () => {
    console.log('Përdoruesi u shkëput:', socket.id);
  });
});
