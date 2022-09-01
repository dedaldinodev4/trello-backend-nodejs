"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUserController = void 0;
const services_1 = require("../../services");
class GetAllUserController {
    async handle(request, response) {
        const service = new services_1.GetAllUserService();
        const result = await service.execute();
        if (result instanceof Error) {
            response.status(400).json(result.message);
        }
        return response.json(result);
    }
}
exports.GetAllUserController = GetAllUserController;
