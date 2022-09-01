"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const services_1 = require("../../services");
class UpdateUserController {
    async handle(request, response) {
        const { id } = request.params;
        const { username, email } = request.body;
        const service = new services_1.UpdateUserService();
        const result = await service.execute(id, {
            username, email
        });
        if (result instanceof Error) {
            response.status(400).json(result.message);
        }
        return response.json(result);
    }
}
exports.UpdateUserController = UpdateUserController;
