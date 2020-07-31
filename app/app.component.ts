import {Component} from '@angular/core';

@Component({
    moduleId:module.id,
    selector:'my-app',
    templateUrl:'app.component.html'

})//<my-app>
//router-outlet vai renderizar dentro dele o componente que pedirmos para ser renderizado dentro dele
//componente do RouterModule
export class AppComponent{

    log(param:string):void{
        console.log(param);
    }

}