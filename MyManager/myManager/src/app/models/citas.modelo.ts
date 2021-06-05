//Clase que representa una cita en base de datos.
export class Cita {
    //Atributos;
    nombreUsuario: string;
    nombreCliente: string;
    presupuesto: number;
    fecha: string;//PK junto con nombre de usuario.
    tamanio: string; //Indica el tamaño del tato, pequeño, mediano, grande

    constructor(_nombreUsuario: string, _nombreCliente:string, _presupuesto: number, _fecha: string, _tamanio:string){
        this.nombreUsuario = _nombreUsuario;
        this.nombreCliente = _nombreCliente;
        this.presupuesto = _presupuesto;
        this.fecha = _fecha;
        this.tamanio = _tamanio;
    }

    //toString.
    public toString(): string{
        return `${this.nombreUsuario} ${this.nombreCliente}  ${this.presupuesto}  ${this.fecha} ${this.tamanio}` ;
    }
}