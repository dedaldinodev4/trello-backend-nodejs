"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneUserController = void 0;
const services_1 = require("../../services");
class GetOneUserController {
    async handle(request, response) {
        const { id } = request.params;
        const service = new services_1.GetOneUserService();
        const result = await service.execute(id);
        if (result instanceof Error) {
            response.status(400).json(result.message);
        }
        return response.json(result);
    }
}
exports.GetOneUserController = GetOneUserController;
