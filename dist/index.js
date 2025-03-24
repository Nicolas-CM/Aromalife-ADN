"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
//let express = require("express");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const connectionDB_1 = require("./lib/connectionDB");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use("/", routes_1.default);
exports.app.get("/", (req, res) => {
    res.send("Hello World");
});
exports.app.get("/error", (req, res) => {
    res.status(500).send("Error");
});
exports.app.get("/notfound", (req, res) => {
    res.status(404).send("Not Found");
});
connectionDB_1.db.then(() => exports.app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}));
