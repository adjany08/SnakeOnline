const Persona = require('./persona');

class PersonaController{
    constructor(){
        this.personas = [];
    }

    agregarPersona(id, nombre, color){
        let jugadorNuevo = new Persona(id, nombre, color);
        this.personas.push(jugadorNuevo);
        return jugadorNuevo;
    }

    //funcion para borrar personas
    borrarPersona(id){
        this.personas = this.personas.filter(persona => persona.getId() != id);
    }

    getPersonas() {
        return this.personas.map(persona => ({
            id: persona.getId(),
            nombre: persona.getNombre(),
            color: persona.getColor(),
        }));
    }

    getPersonasPorGrupo(groupId) {
        return this.personas.filter(persona => persona.getGrupoId() === groupId);
    }
}
module.exports = PersonaController;