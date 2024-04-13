
export default class DadosUsuarioModel{
    nome:       string;
    sobrenome:  string;
    email:      string;    
    idade:      string;
    cep:        string;
    logradouro: string;
    bairro:     string;
    cidade:     string;
    uf:         string;
    id:any ;
  
    constructor(
    nome: string,
    sobrenome: string,
    email: string,
    idade: string,
    cep:string,    
    logradouro:string,
    bairro: string,
    cidade:string,
    uf:string,
    id: any,
    )  {
        this.nome = nome
        this.sobrenome = sobrenome
        this.email = email
        this.idade = idade
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.id = id;
    }
  }