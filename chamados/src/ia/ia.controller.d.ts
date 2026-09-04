import { ResponderDto } from './dto/responder.dto';
import { IaService } from './ia.service';
export declare class IaController {
    private readonly iaService;
    constructor(iaService: IaService);
    responder(dto: ResponderDto): Promise<{
        resposta: string;
        modelo: string;
        uso: {
            tokensEntrada: number | undefined;
            tokensSaida: number | undefined;
        };
    }>;
}
