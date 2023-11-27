// grupo.js
class Grupo {
    constructor(id, tipo, maxJugadores, tiempo, largo) {
        this.id = id;
        this.jugadores = [];
        this.tipo = tipo; 
        this.minJugadores = 2; //por defecto
        this.maxJugadores = maxJugadores;
        this.tiempo = tiempo;
        this.largo = largo;
    }

    agregarJugador(jugador) {
        this.jugadores.push(jugador);
    }

    quitarJugador(socketId) {
        this.jugadores = this.jugadores.filter((jugador) => jugador.socketId !== socketId);
    }

    obtenerInfoGrupo() {
        return {
            id: this.id,
            jugadores: this.jugadores,
            tipo: this.tipo,
            maxJugadores: this.maxJugadores,
        };
    }
}

module.exports = Grupo;
