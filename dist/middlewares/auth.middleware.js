"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.auth = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken")); // Importing JWT library and TokenExpiredError for token handling
// Middleware to authenticate users
const auth = (req, res, next) => {
    let token = req.header("Authorization"); // Extracting the Authorization header
    if (!token) {
        // If no token is provided, respond with a 401 status
        res.status(401).json("Not Authorized");
        return;
    }
    try {
        // Removing the "Bearer " prefix from the token
        token = token.replace("Bearer ", "");
        // Verifying the token using the secret key
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        // Attaching the decoded user information to the request body
        req.body.loggedUser = decoded.user;
        next(); // Proceeding to the next middleware or route handler
    }
    catch (error) {
        // Handling token expiration error
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            res.status(401).json("Token Expired");
            return;
        }
        // Handling other token-related errors
        res.status(401).json("Not Authorized");
    }
};
exports.auth = auth;
// Middleware to authorize users based on roles
const authorize = (roles) => {
    return (req, res, next) => {
        const userRoles = req.body.loggedUser.roles; // Extracting the roles of the logged-in user
        // Checking if the user has at least one of the required roles
        if (!roles.some((role) => userRoles.includes(role))) {
            // If the user does not have the required roles, respond with a 403 status
            res.status(403).json("Forbidden");
            return;
        }
        next(); // Proceeding to the next middleware or route handler
    };
};
exports.authorize = authorize;
