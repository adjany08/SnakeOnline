class Persona{
    static contador = 0;
    constructor(id, nombre, color){
        this.id = id
        this.nombre = nombre;
        this.color = color;
    }

    getId(){
        return this.id;
    }

    getNombre(){
        return this.nombre;
    }

    getColor(){
        return this.color;
    }
}

module.exports = Persona;