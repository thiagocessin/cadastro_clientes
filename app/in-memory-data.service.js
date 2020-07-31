"use strict";
class InMemoryDataService {
    createDb() {
        let contatos = [
            { id: 1, nome: 'Thiago', email: 'thiago@teste', telefone: '2252525252' },
            { id: 2, nome: 'Jose', email: 'jose@teste', telefone: '2252525252' },
            { id: 3, nome: 'Maria', email: 'maria@teste', telefone: '2252525252' },
            { id: 4, nome: 'João', email: 'joao@teste', telefone: '2252525252' }
        ];
        let carros = [
            { id: 1, descricao: 'Camaro' },
            { id: 2, descricao: 'Mustang' }
        ];
        return {
            'contatos': contatos,
            'carros': carros
        };
    }
}
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map