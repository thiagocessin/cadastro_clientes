import { Injectable } from "@angular/core";

@Injectable()
export class DialogService{

    //parametro opcional
    confirm(message?:string){
        //construtor da promise recebe uma função de callBack
        //retornamos a resolução dessa promise
        return new Promise(resolve=>{
            return resolve(window.confirm(message || 'Confirmar?'));
        });

    }


}