"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const repositories_1 = require("../../repositories");
class UpdateUserService {
    async execute(id, { username, email }) {
        const _repository = (0, repositories_1.userRepository)();
        const user = await _repository.findById(id);
        if (!user) {
            return new Error("User doesn't exists!");
        }
        user.username = username;
        user.email = email;
        await user.save();
        return {
            id,
            username: user.username,
            email: user.email
        };
    }
}
exports.UpdateUserService = UpdateUserService;
