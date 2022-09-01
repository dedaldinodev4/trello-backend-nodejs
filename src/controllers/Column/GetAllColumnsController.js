"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllColumnsController = void 0;
const services_1 = require("../../services");
class GetAllColumnsController {
    async handle(request, response) {
        const service = new services_1.GetAllColumnsService();
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
exports.GetAllColumnsController = GetAllColumnsController;
