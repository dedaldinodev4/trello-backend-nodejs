"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneBoardController = void 0;
const services_1 = require("../../services");
class GetOneBoardController {
    async handle(request, response) {
        const { id } = request.params;
        const service = new services_1.GetOneBoardService();
        const result = await service.execute(id);
        if (result instanceof Error) {
            response.status(400).json(result.message);
        }
        return response.json(result);
    }
}
exports.GetOneBoardController = GetOneBoardController;
