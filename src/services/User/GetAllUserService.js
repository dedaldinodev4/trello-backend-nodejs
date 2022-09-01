"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUserService = void 0;
const repositories_1 = require("../../repositories");
class GetAllUserService {
    async execute() {
        const _repository = (0, repositories_1.userRepository)();
        const user = await _repository.find();
        return user;
    }
}
exports.GetAllUserService = GetAllUserService;
