import { Component, OnInit } from "@angular/core";
import { ContatoService } from "./contato.service";
import { Contato } from "./contato.model";
import { DialogService } from "../dialog.service";


@Component({
    moduleId:module.id,
    selector:'contatos-lista',
    templateUrl:'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit{
    //array recebe o valor recuperado do mock contatos
    contatos: Contato[] = [];
    mensagem: {};
    classesCss:{};
    private currentTimeout: any;

    //a dependência é injetada direto no contrutor pois o angular gerencia essa injeção
    //fazendo com que os parâmetros sejam enviados corretamente
    //não é correto instanciar um novo objeto: contatoService:ContatoService = new ContatoService()
    //criando o contrutor dessa forma o objeto declarado já é visivel no escopo da classe
    constructor(
        private contatoService:ContatoService,
        private dialogService : DialogService){

    }
    //ciclo de vida inicial do componente
    //implemementa a interface OnInit
        ngOnInit():void{
        this.contatoService.findAll()
            .then((contatos:Contato[])=>{
                this.contatos = contatos;
            }).catch((err) =>{
                this.mostrarMensagem({
                    tipo:'danger',
                    texto:'Ocorreu um erro ao buscar a lista de contatos'
                });
            });
    }

    onDelete(contato:Contato):void{
       this.dialogService.confirm('Deseja deletar o contato' + contato.nome)
        .then((canDelete:boolean)=>{
            if(canDelete){
                this.contatoService.delete(contato)
                .then(() =>{
                    this.contatos = this.contatos
                        .filter((c:Contato)=> c.id != contato.id); //filtra a lista somente com os itens que são difernetes do ID
                        this.mostrarMensagem({
                            tipo:'success',
                            texto:'Contato Deletado'
                        });
                    
                    }).catch(err =>{
                    console.log(err);
                    this.mostrarMensagem({
                        tipo:'danger',
                        texto:'Ocorreu um erro ao deletar o contato'
                    });
                });
            }
        })      
    }

    private mostrarMensagem(mensagem:{tipo:string, texto:string}):void{
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        
        if(this.currentTimeout){
            clearTimeout(this.currentTimeout);
        }

        this.currentTimeout = setTimeout(()=>{
            this.mensagem = undefined;
        },3000);
    }

    montarClasses(tipo: string):void {
        this.classesCss = {
            'alert':true
        };
        this.classesCss['alert-'+tipo] = true;
    }

}