"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_STRING = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlZGFsZGluby
BEYW5pZWwiLCJpYXQiOjE1MTYyMzkwMjJ9.Yp-tQG_Z8PBijiai8znsAnSQs_-VPvSxl65f4-6E6ekV`;
const { APP_PORT, APP_BASEURL, MONGO_DB, MONGO_STRING, MONGO_CLUSTER } = process.env;
exports.configs = {
    variables: {
        app: {
            APP_PORT,
            APP_BASEURL,
            JWT_STRING
        },
        mongo: {
            MONGO_STRING,
            MONGO_DB,
            MONGO_CLUSTER,
        }
    }
};
