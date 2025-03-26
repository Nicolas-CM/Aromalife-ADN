"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
// Defining a custom exception class for authentication errors
class AuthError extends Error {
    constructor() {
        super(...arguments);
        // Setting the name property to the class name
        this.name = this.constructor.name;
        // Overriding the stack property to include a custom error message
        this.stack = "Authentication Error \n" + this.stack;
    }
}
exports.AuthError = AuthError;
