import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { GerarRespostaInput, GerarRespostaOutput, ModeloProvider } from './modelo.provider';
export declare class OllamaProvider implements ModeloProvider {
    private readonly http;
    private readonly config;
    constructor(http: HttpService, config: ConfigService);
    gerar(input: GerarRespostaInput): Promise<GerarRespostaOutput>;
}
