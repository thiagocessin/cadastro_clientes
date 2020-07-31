import { NgModule } from "@angular/core";
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
    {
        path:'',//acessa URL raiz
        redirectTo:'/contato',
        pathMatch:'full'
    }
];

@NgModule({
        imports:[
            RouterModule.forRoot(appRoutes)//roteia a aplicação a partir do root
        ],
        exports:[
            RouterModule
        ]//modulos que são disponibilizados para outros modulos que forem imortar esse modulo

})
export class AppRoutingModule{
    

}