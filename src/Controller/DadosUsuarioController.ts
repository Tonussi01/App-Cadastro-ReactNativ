import DadosUsuarioModel from "../Model/DadosUsuarioModel";


export class DadosUsuarioController {
 
    static ceps: DadosUsuarioModel[] = [];

    static async fecthCep(cep: string): Promise<void>{
        try{
            const response = await fetch (`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if(!data.erro){
                const dadosUsuarioModel = new DadosUsuarioModel(
                    "", 
                    "", 
                    "",
                    data.cep, 
                    "", 
                    data.logradouro, 
                    data.bairro,
                    data.localidade,
                    data.uf, ""
                );
                this.ceps.push(dadosUsuarioModel)
            } else{
                console.log('Cep não encontrato')
            }
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }   
    
    static getCeps ():DadosUsuarioModel[]{
        return this.ceps;
    }
} 