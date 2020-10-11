import { SelectItem } from 'primeng/api';

export class Usuario {

    id: number;
    login: string;
    senha: string;
    pessoa: {nome: string, tipoPessoa: string, cpf: string, empresa: SelectItem}
    role: { id: string, descricaoRole: string };

    constructor(){
        this.pessoa = {nome: '', tipoPessoa: '', cpf: '', empresa: undefined};
    }
}
