// grupoController.js
const Grupo = require('./grupo');

class GrupoController {
    constructor() {
        this.grupos = {};
    }

    crearGrupo(id) {
        if (!this.grupos[id]) {
            this.grupos[id] = new Grupo(id);
        }
    }

    agregarJugadorAGrupo(groupId, jugador) {
        if (this.grupos[groupId]) {
            this.grupos[groupId].agregarJugador(jugador);
        }
    }

    quitarJugadorDeGrupo(groupId, socketId) {
        if (this.grupos[groupId]) {
            this.grupos[groupId].quitarJugador(socketId);

            // Si no hay jugadores en el grupo, puedes eliminar la instancia del grupo
            if (this.grupos[groupId].jugadores.length === 0) {
                delete this.grupos[groupId];
            }
        }
    }

    existeGrupo(groupId) {
        return !!this.grupos[groupId];
    }

    obtenerInfoGrupos() {
        return Object.keys(this.grupos).map((groupId) => this.grupos[groupId].obtenerInfoGrupo());
    }
}

module.exports = GrupoController;
