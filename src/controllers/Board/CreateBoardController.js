"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBoardController = void 0;
const services_1 = require("../../services");
class CreateBoardController {
    async handle(request, response) {
        const { title } = request.body;
        if (!request.user) {
            return response.status(401).json({ message: 'UnAuthorized' });
        }
        const userId = request.user?.id;
        const service = new services_1.CreateBoardService();
        const result = await service.execute({ title, userId });
        if (result instanceof Error) {
            response.status(400).json(result.message);
        }
        return response.json(result);
    }
}
exports.CreateBoardController = CreateBoardController;
