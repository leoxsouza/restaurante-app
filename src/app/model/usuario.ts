export class Usuario {

    id: number;
    login: string;
    nome: string;
    senha: string;
    role: { id: string, descricaoRole: string };
}
