const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const PersonaController = require('./personaController');
const GrupoController = require('./grupoController');

const controladorPersonas = new PersonaController();
const controladorGrupos = new GrupoController();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: { origin: '*' }
});

app.use(cors());

app.get('/grupos', (req, res) => {
    const gruposArray = controladorGrupos.obtenerInfoGrupos();
    res.send(gruposArray);
});

app.get("/personas", (req, res) => {
    const personas = controladorPersonas.getPersonas();
    res.send(personas);
});

io.on('connection', (socket) => {
    console.log('Se ha conectado un cliente');

    socket.broadcast.emit('chat_message', {
        usuario: 'INFO',
        mensaje: 'Se ha conectado un nuevo usuario'
    });

    socket.on('join_group', ({ groupId, username, color }) => {
        if (socket.rooms.size > 1) {
            const prevGroupId = Array.from(socket.rooms)[1];
            socket.leave(prevGroupId);
            controladorGrupos.quitarJugadorDeGrupo(prevGroupId, socket.id);
            controladorPersonas.borrarPersona(socket.id);
            io.to(prevGroupId).emit('chat_message', {
                usuario: 'INFO',
                mensaje: `${username} ha abandonado el grupo`
            });
        }

        socket.join(groupId);
        const persona = controladorPersonas.agregarPersona(socket.id, username, color);
        controladorGrupos.agregarJugadorAGrupo(groupId, persona);
        io.to(groupId).emit('chat_message', {
            usuario: 'INFO',
            mensaje: `${username} se ha unido al grupo`,
            color,
        });
    });

    socket.on('create_group', ({ groupId, username, color, tipoPartida, maxJugadores }) => {
        if(controladorGrupos.existeGrupo(groupId)) {
            socket.emit('chat_message', {
                usuario: 'INFO',
                mensaje: 'El grupo ya existe'
            });
            return;
        }
        socket.join(groupId);
        const persona = controladorPersonas.agregarPersona(socket.id, username, color);
        controladorGrupos.crearGrupo(groupId, tipoPartida, maxJugadores);
        controladorGrupos.agregarJugadorAGrupo(groupId, persona);
        io.to(groupId).emit('chat_message', {
            usuario: 'INFO',
            mensaje: `${username} ha creado el grupo`,
            color,
        });
    });

    socket.on('chat_message', (data) => {
        io.to(data.groupId).emit('chat_message', data);
    });

    socket.on('leave_group', ({ groupId, username }) => {
        socket.leave(groupId);
        controladorGrupos.quitarJugadorDeGrupo(groupId, socket.id);
        controladorPersonas.borrarPersona(socket.id);
        io.to(groupId).emit('chat_message', {
            usuario: 'INFO',
            mensaje: `${username} ha abandonado el grupo`
        });
    });
});

const PORT = 8000;

server.listen(process.env.PORT || PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
