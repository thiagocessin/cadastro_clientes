"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
const http_1 = require("@angular/http");
//emite metadados para o angular identificar outras dependências do service
//faz a injeção dessas dependências
let ContatoService = class ContatoService {
    constructor(http) {
        this.http = http;
        //retorno síncrono
        /*
        findAll():Contato[]{
            return CONTATOS;
        }
         */
        this.contatosUrl = 'app/contatos';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    findAll() {
        //Http.get() retorna um observable da lib rxjs
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
        //return Promise.resolve(CONTATOS);
    }
    create(contato) {
        return this.http
            .post(this.contatosUrl, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then((response) => response.json().data)
            .catch(this.handleError);
    }
    update(contato) {
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
            .put(url, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handleError);
    }
    delete(contato) {
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
            .delete(url, { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handleError);
    }
    find(id) {
        return this.findAll()
            .then((contatos) => {
            return contatos.find((contato) => {
                return contato.id === id;
            });
        });
    }
    handleError(erro) {
        console.log('Erro:', erro);
        return Promise.reject(erro.message || erro);
    }
    //encadeamento de promises
    getContatosSlowly() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        })
            .then(() => {
            console.log('primeiro then');
            return 'Curso angular 2';
        })
            .then((param) => {
            console.log('segundo then');
            console.log(param);
            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log('continuando depois de 4 segundos');
                    resolve2();
                }, 4000);
            });
        })
            .then(() => {
            console.log('terceiro Then');
            return this.findAll();
        }); //isso é o mesmo que return this.findAll()
    }
    search(term) {
        return this.http
            .get(`${this.contatosUrl}/?nome=${term}`)
            .map((res) => res.json().data);
    }
};
ContatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato.service.js.map