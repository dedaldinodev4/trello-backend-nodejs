"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.ensuredAuthenticated = void 0;
const Auth_1 = require("./Auth");
Object.defineProperty(exports, "ensuredAuthenticated", { enumerable: true, get: function () { return Auth_1.ensuredAuthenticated; } });
Object.defineProperty(exports, "currentUser", { enumerable: true, get: function () { return Auth_1.currentUser; } });
