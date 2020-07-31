"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
let DialogService = class DialogService {
    //parametro opcional
    confirm(message) {
        //construtor da promise recebe uma função de callBack
        //retornamos a resolução dessa promise
        return new Promise(resolve => {
            return resolve(window.confirm(message || 'Confirmar?'));
        });
    }
};
DialogService = __decorate([
    core_1.Injectable()
], DialogService);
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.service.js.map