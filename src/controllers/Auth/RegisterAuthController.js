"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const services_1 = require("../../services");
class RegisterController {
    async handle(request, response) {
        const { email, username, password } = request.body;
        const service = new services_1.RegisterService();
        const result = await service.execute({ email, username, password });
        if (result instanceof Error) {
            response.status(400).json(result.message);
        }
        return response.json(result);
    }
}
exports.RegisterController = RegisterController;
