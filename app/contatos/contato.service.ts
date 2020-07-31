import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { Contato } from "./contato.model";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import { ServiceInterface } from "../interfaces/service.interface";

//emite metadados para o angular identificar outras dependências do service
//faz a injeção dessas dependências
@Injectable()
export class ContatoService implements ServiceInterface<Contato>{

    //retorno síncrono
    /*
    findAll():Contato[]{
        return CONTATOS;
    }
     */

     private contatosUrl:string = 'app/contatos';
     private headers : Headers = new Headers(
            {'Content-Type':'application/json'});

     constructor(private http:Http){
        
     }

    findAll():Promise<Contato[]>{
         //Http.get() retorna um observable da lib rxjs
        return this.http.get(this.contatosUrl)
        .toPromise()
        .then(response => response.json().data as Contato[])
        .catch(this.handleError);

        //return Promise.resolve(CONTATOS);
    }

    create(contato:Contato):Promise<Contato>{
        
        return this.http
                .post(this.contatosUrl,JSON.stringify(contato),{headers:this.headers})
                .toPromise()
                .then((response:Response)=> response.json().data as Contato)
                .catch(this.handleError);
    }

    update(contato:Contato):Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
                .put(url,JSON.stringify(contato),{headers:this.headers})
                .toPromise()
                .then(()=> contato as Contato)
                .catch(this.handleError);
    }

    delete(contato:Contato):Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id

        return this.http
        .delete(url,{headers:this.headers})
        .toPromise()
        .then(()=> contato as Contato)
        .catch(this.handleError);

    }


    find(id:number): Promise<Contato>{
        return this.findAll()
            .then((contatos:Contato[])=>{
                return contatos.find((contato)=>{
                    return contato.id === id;
                });
            });


    }

    private handleError(erro:any):Promise<any>{
        console.log('Erro:', erro);
        return Promise.reject(erro.message || erro);
    }

    //encadeamento de promises
    getContatosSlowly():Promise<Contato[]>{
        return new Promise((resolve, reject)=>{
            setTimeout(resolve,2000)
        })
        .then(()=>{
                    console.log('primeiro then');
                    return 'Curso angular 2';
                })
        .then((param:string)=>{
            console.log('segundo then');
            console.log(param);

            return new Promise((resolve2, reject2)=>{
                setTimeout(()=>{
                    console.log('continuando depois de 4 segundos');
                    resolve2();
                },4000);
            })

        })
        .then(()=> {
             console.log('terceiro Then');
             return this.findAll();
            });//isso é o mesmo que return this.findAll()
    }

    search(term:string):Observable<Contato[]>{
        return this.http
        .get(`${this.contatosUrl}/?nome=${term}`)
        .map((res:Response)=> res.json().data as Contato[]);
    }
}