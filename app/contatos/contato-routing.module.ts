import { NgModule } from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import { ContatosListaComponent } from "./contatos-lista.component";
import { ContatoDetalheComponent } from "./contato-detalhe.component";


const contatoRoutes : Routes = [
    {
        path:'contato',//rota
        component:ContatosListaComponent //componente a ser renderizado
    },
    {
        path:'contato/save',
        component: ContatoDetalheComponent
    },
    {
        path:'contato/save/:id',
        component: ContatoDetalheComponent
    }

];

//compilation context
@NgModule({
        imports:[RouterModule.forChild(contatoRoutes)
    ],
    exports:[RouterModule]
})
export class ContatoRoutingModule{}

