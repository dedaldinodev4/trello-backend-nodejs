"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneUserService = void 0;
const repositories_1 = require("../../repositories");
class GetOneUserService {
    async execute(id) {
        const _repository = (0, repositories_1.userRepository)();
        const user = await _repository.findById(id);
        if (!user) {
            return new Error("User doesn't exists!");
        }
        return {
            id,
            email: user.email,
            username: user.username
        };
    }
}
exports.GetOneUserService = GetOneUserService;
