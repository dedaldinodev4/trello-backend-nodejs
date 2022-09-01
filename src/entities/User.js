"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = require("bcrypt");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [validator_1.default.isEmail, "Invalid email"],
        createIndexes: { unique: true }
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
}, {
    timestamps: true
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await (0, bcrypt_1.hashSync)(this.password, 10);
        return next();
    }
    catch (err) {
        return next(err);
    }
});
userSchema.methods.validatePassword = function (password) {
    return (0, bcrypt_1.compareSync)(password, this.password);
};
exports.default = (0, mongoose_1.model)("User", userSchema);
