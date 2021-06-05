import { Cita } from './citas.modelo';

export class Usuario{

    //Atributos;
    emailUsuario: string; //PK en la base de datos.
    claveUsuario: string;
    listaCitas: Cita[];

    constructor(_emailUsuario: string, _claveUsuario:string){
        this.emailUsuario = _emailUsuario;
        this.claveUsuario = _claveUsuario;
        this.listaCitas =[];
    }    

    //toString.
    toString(): string{

        let listaCitasToString: string = "";
        for(let i = 0; i < this.listaCitas.length; ++i){
            listaCitasToString += this.listaCitas[i].toString();

            //En la última iteración no pondrá la coma.
            if(i < this.listaCitas.length - 2){
                listaCitasToString += ", ";
            }
        };

        return `Usuario{emailUsuario='${this.emailUsuario}', claveUsuario='${this.claveUsuario}', listaCitas='${listaCitasToString}'}`;
    }

}