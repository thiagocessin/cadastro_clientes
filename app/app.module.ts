import './util/rxjs-extensions';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContatosModule } from './contatos/contatos.module';
import { HttpModule } from '@angular/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {AppRoutingModule} from './app-routing.module';
import { InMemoryDataService } from './in-memory-data.service';
import { DialogService } from './dialog.service';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports:[
        AppRoutingModule,
        BrowserModule,
        ContatosModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)],
    declarations:[AppComponent],
    bootstrap:[AppComponent],
    //provedores de serviço da aplicação
    //provedor é algo que ode criar ou devolver um serviço
    //devolve a classe e não a istância
    //provedor registra o serviço
    //receita de como criar o serviço
    //o injetor retorna a instância pronta
    //quando ele não tem, pede ao provedor
    providers:[
        DialogService
    ]
})
//decorator para dizer que essa classe é um modulo do angular(metadados)//importar modulos, entrypoint
//BroowserModule para dizer que nossa aplicação rodará em um browser
// declarations - declarar todos os componentes que utilizamos
//bootstrap - boot da aplicação, componente root
export class AppModule{


}