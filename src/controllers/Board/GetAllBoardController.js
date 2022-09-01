"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllBoardController = void 0;
const services_1 = require("../../services");
class GetAllBoardController {
    async handle(request, response) {
        const service = new services_1.GetAllBoardService();
        if (!request.user) {
            return response.status(401).json({ message: 'UnAuthorized' });
        }
        const { id } = request.user;
        const result = await service.execute(id);
        if (result instanceof Error) {
            response.status(400).json(result.message);
        }
        return response.json(result);
    }
}
exports.GetAllBoardController = GetAllBoardController;
