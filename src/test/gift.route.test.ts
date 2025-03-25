import request from "supertest";
import express from "express";
import { giftRouter } from "../routes/gift.route";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use("/gifts", giftRouter);

describe("Gift Routes", () => {
  describe("DELETE /gifts/:id", () => {
    it("debe requerir autenticación JWT", async () => {
      const response = await request(app).delete("/gifts/123").send();
      expect(response.statusCode).toBe(401);
    });
  });

  describe("GET /gifts", () => {
    it("debe requerir autenticación JWT", async () => {
      const response = await request(app).get("/gifts").send();
      expect(response.statusCode).toBe(401);
    });
  });

  describe("POST /gifts", () => {
    it("debe requerir autenticación JWT", async () => {
      const response = await request(app).post("/gifts").send({
        name: "Ramo de Rosas",
        description: "Un hermoso ramo de rosas rojas",
        price: 25000,
        imageUrl: "https://example.com/rosas.jpg",
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe("PUT /gifts/:id", () => {
    it("debe requerir autenticación JWT", async () => {
      const response = await request(app).put("/gifts/123").send({
        name: "Caja de Bombones",
        price: 20000,
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
