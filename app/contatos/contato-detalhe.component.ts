import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params} from "@angular/router";
import { Location} from "@angular/common";
import { ContatoService } from "./contato.service";
import { Contato } from "./contato.model";



//.ng-valid[required] - aplica o estilo somente para os campos required = true
// .ng-invalid:not(form) - não aplica a tag form
@Component({
    moduleId:module.id,
    selector:'',
    templateUrl:'contato-detalhe.component.html'
   
})
export class ContatoDetalheComponent implements OnInit{

    contato:Contato;
    private isNew:boolean = true;
    private cont:number = 0;
    
    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ){}

    //sempre que um item da lista for acessado, onInit é chamado
    ngOnInit() :void{
        this.contato = new Contato(0,'','','');
        //retorna um observable dos parametros da rota
        this.route.params.forEach((params:Params)=>{
            //o + converte para string
            let id:number = +params['id'];
            
            if(id){
                this.isNew= false;
            this.contatoService.find(id)
                .then((contato:Contato)=>{
                    this.contato = contato;

                })
            }
        });
    }

    getFormGroupClass(isValid:boolean, isPristine:boolean):{} {
        return {'form-group':true, 
        'has-danger':(!isValid && !isPristine),
        'has-success':(isValid && !isPristine)}
    }

    getFormControlClass(isValid:boolean, isPristine:boolean):{} {
        return {'form-control':true, 
        'form-control-danger':(!isValid && !isPristine),
        'form-control-success':(isValid && !isPristine)}
    }

   
    onSubmit():void{
        let promise;
       

       if(this.isNew){
      
        this.contato.id = Math.random();
        promise = this.contatoService.create(this.contato);       
       }else{
         console.log('alterar');
         promise = this.contatoService.update(this.contato);
        }

        promise.then(contato => this.goBack());
    }

    goBack():void {

        this.location.back();
    }
}