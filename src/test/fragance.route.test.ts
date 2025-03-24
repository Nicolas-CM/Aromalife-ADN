import request from "supertest";
import express from "express";
import { fragranceRouter } from "../routes/fragrance.route";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use("/fragrances", fragranceRouter);

describe("Fragrance Routes", () => {
  describe("DELETE /fragrances/:id", () => {
    it("debe requerir autenticación JWT", async () => {
      const response = await request(app).delete("/fragrances/123").send();

      expect(response.statusCode).toBe(401);
    });
  });
  describe("GET /fragrances", () => {
    it("debe requerir autenticación JWT", async () => {
      const response = await request(app).get("/fragrances").send();
      expect(response.statusCode).toBe(401);
    });
  });
  describe("POST /fragrances", () => {
    it("debe requerir autenticación JWT", async () => {
      const response = await request(app).post("/fragrances").send({
        name: "Menta",
        color: "#00FF00",
        price: 18000,
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
