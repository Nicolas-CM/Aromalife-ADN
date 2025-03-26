"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const models_1 = require("../models");
const exceptions_1 = require("../exceptions");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    create(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findByEmail(userInput.email);
                if (userExists != null) {
                    throw new ReferenceError("User already exists");
                }
                if (userInput.password)
                    userInput.password = yield bcrypt_1.default.hash(userInput.password, 10);
                const user = yield models_1.UserModel.create(userInput);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findOne({ email });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.UserModel.find();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findById(id);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findOneAndUpdate({ _id: id }, userInput, { returnOriginal: false });
                if (user)
                    user.password = "";
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findByIdAndDelete(id);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findByEmail(userLogin.email);
                if (userExists === null) {
                    throw new exceptions_1.AuthError("User or password incorrect");
                }
                const isMatch = yield bcrypt_1.default.compare(userLogin.password, userExists.password);
                if (!isMatch) {
                    throw new exceptions_1.AuthError("User or password incorrect");
                    console.log("No hacen match");
                }
                return {
                    user: {
                        id: userExists.id,
                        name: userExists.name,
                        email: userExists.email,
                        roles: userExists.roles,
                        token: this.generateToken(userExists),
                        age: userExists.age,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateToken(user) {
        try {
            return jsonwebtoken_1.default.sign({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    roles: user.roles,
                },
            }, process.env.JWT_SECRET || "secret", { expiresIn: "10m" });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.userService = new UserService();
