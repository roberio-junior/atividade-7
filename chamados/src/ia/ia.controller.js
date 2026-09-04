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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IaController = void 0;
const common_1 = require("@nestjs/common");
const responder_dto_1 = require("./dto/responder.dto");
const ia_service_1 = require("./ia.service");
let IaController = class IaController {
    constructor(iaService) {
        this.iaService = iaService;
    }
    async responder(dto) {
        const resultado = await this.iaService.responder(dto.mensagem);
        return {
            resposta: resultado.resposta,
            modelo: resultado.modelo,
            uso: {
                tokensEntrada: resultado.tokensEntrada,
                tokensSaida: resultado.tokensSaida,
            },
        };
    }
};
exports.IaController = IaController;
__decorate([
    (0, common_1.Post)('responder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [responder_dto_1.ResponderDto]),
    __metadata("design:returntype", Promise)
], IaController.prototype, "responder", null);
exports.IaController = IaController = __decorate([
    (0, common_1.Controller)('ia'),
    __metadata("design:paramtypes", [ia_service_1.IaService])
], IaController);
//# sourceMappingURL=ia.controller.js.map