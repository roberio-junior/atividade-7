import { GerarRespostaOutput, ModeloProvider } from './providers/modelo.provider';
export declare class IaService {
    private readonly modelo;
    constructor(modelo: ModeloProvider);
    responder(mensagem: string): Promise<GerarRespostaOutput>;
}
