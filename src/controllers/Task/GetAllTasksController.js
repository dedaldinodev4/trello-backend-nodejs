"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTasksController = void 0;
const services_1 = require("../../services");
class GetAllTasksController {
    async handle(request, response) {
        const service = new services_1.GetAllTasksService();
        if (!request.user) {
            return response.status(401).json({ message: 'UnAuthorized' });
        }
        const { id } = request.user;
        const { boardId } = request.params;
        const result = await service.execute(boardId);
        if (result instanceof Error) {
            response.status(400).json(result.message);
        }
        return response.json(result);
    }
}
exports.GetAllTasksController = GetAllTasksController;
