import { Component, OnInit, OnChanges,Input, SimpleChanges, SimpleChange,EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Contato } from '../contato.model';
import { Subject } from 'rxjs/Subject';
import { ContatoService } from '../contato.service';
import { Router } from '@angular/router';


//  styleUrls: ['contato-busca.component.scss'
@Component({
     moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles:[`
        .cursor-pointer:hover{
            cursor:pointer;
        }
    `]
})
export class ContatoBuscaComponent implements OnInit, OnChanges {
   
    //input property
    //declaração do atributo que é uma via de entrada de dados do component
    //(nome que quiser usar no html)
    @Input() busca:string;
    @Output() buscaChange:EventEmitter<string> = new EventEmitter<string>();//emite eventos String
    contatos: Observable<Contato[]>;
    //produtor de fluxo de eventos 'observáveis'
    private termosDaBusca:Subject<string> = new Subject<string>();

    constructor(
       private contatoService:ContatoService,
       private router:Router
    ){}

    ngOnInit():void{
        this.contatos = this.termosDaBusca
                .debounceTime(500)
                .distinctUntilChanged()
                //ignore se o proximo termo de busca for igual ao anterior
                //verifica a ultima busca efetuada, se for a mesma da ultima, não fara de novo
                .switchMap(term=>{
                    return term ? this.contatoService.search(term) : Observable.of<Contato[]>([]);
                }).catch(erro =>{
                    console.log(erro);
                    return Observable.of<Contato[]>([]);
                });
            //switchMap - para cada termo da lista ele fará uma chamada ao servidor
            //gerencia as pesquisas anteriores, vai retornar somente a ultima pesquisa
            //preserva a ordem original das requisições
    }
    ngOnChanges(changes:SimpleChanges):void{
        //simpleChanges vai trazer um objeto que contém as nossas propriedades que estão marcadas com Input que foram alteradas
        //dentro dele conseguimos acessar o valor atual dessa propriedade e o valor anterior
         let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);

    }

    search(termo:string){
        //adiciona a fila de eventos
        this.termosDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato:Contato):void{
        let link = ['contato/save',contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }

    //OnChanges escuta todas as alterações de campos que estão marcados com @Input
}
