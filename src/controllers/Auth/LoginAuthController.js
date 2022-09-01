"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const services_1 = require("../../services");
class LoginController {
    async handle(request, response) {
        const { email, password } = request.body;
        const service = new services_1.LoginService();
        const result = await service.execute({
            email, password
        });
        if (result instanceof Error) {
            response.status(400).json(result.message);
        }
        return response.json(result);
    }
}
exports.LoginController = LoginController;
