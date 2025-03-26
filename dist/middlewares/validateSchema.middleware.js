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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
// Middleware to validate the request body against a given schema
const validateSchema = (schema) => {
    // Returning an asynchronous middleware function
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Parsing and validating the request body using the provided schema
            yield schema.parseAsync(req.body);
            // If validation succeeds, proceed to the next middleware or route handler
            next();
        }
        catch (error) {
            // If validation fails, respond with a 400 status and the error details
            res.status(400).json(error);
        }
    });
};
exports.validateSchema = validateSchema;
