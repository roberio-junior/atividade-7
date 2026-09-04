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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaProvider = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_2 = __importDefault(require("axios"));
let OllamaProvider = class OllamaProvider {
    constructor(http, config) {
        this.http = http;
        this.config = config;
    }
    async gerar(input) {
        const baseUrl = this.config.getOrThrow('OLLAMA_BASE_URL');
        const model = this.config.getOrThrow('OLLAMA_MODEL');
        const timeout = Number(this.config.get('OLLAMA_TIMEOUT_MS') ?? '30000');
        try {
            const response = await this.http.axiosRef.post(`${baseUrl}/api/chat`, {
                model,
                messages: [
                    {
                        role: 'user',
                        content: input.mensagem,
                    },
                ],
                stream: false,
            }, { timeout });
            const content = response.data.message?.content?.trim();
            if (!content) {
                throw new common_1.BadGatewayException('Resposta inválida do modelo');
            }
            return {
                resposta: content,
                modelo: response.data.model,
                tokensEntrada: response.data.prompt_eval_count,
                tokensSaida: response.data.eval_count,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadGatewayException) {
                throw error;
            }
            if (axios_2.default.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
                    throw new common_1.GatewayTimeoutException('Tempo limite da inferência excedido');
                }
                if (error.code === 'ECONNREFUSED') {
                    throw new common_1.ServiceUnavailableException('Servidor de IA indisponível');
                }
            }
            throw new common_1.BadGatewayException('Falha ao consultar o modelo');
        }
    }
};
exports.OllamaProvider = OllamaProvider;
exports.OllamaProvider = OllamaProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], OllamaProvider);
//# sourceMappingURL=ollama.provider.js.map