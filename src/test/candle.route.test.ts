import request from "supertest";
import express from "express";
import { candleRouter } from "../routes/candle.route";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use("/customizations", candleRouter);

jest.spyOn(jwt, "verify").mockImplementation((token) => {
  if (token === "valid.role.token") return { roles: ["superadmin"] };
  if (token === "invalid.role.token") return { roles: ["client"] };
  throw new Error("Invalid token");
});

describe("CandleCustomization Routes", () => {
  describe("POST /customizations", () => {
    it("debe requerir autenticación", async () => {
      const response = await request(app).post("/customizations").send({});
      expect(response.statusCode).toBe(401);
    });

    it("debe requerir rol superadmin", async () => {
        const response = await request(app)
          .delete("/customizations/641a9f0b2f7b88a9b8e7c999")
          .set("Authorization", "Bearer invalid.role.token");
  
        expect(response.statusCode).toBe(401);
      });
  });

    describe("PUT /customizations/:id", () => {
        it("debe requerir autenticación", async () => {
        const response = await request(app).put("/customizations/1");
        expect(response.statusCode).toBe(401);
        });
    
        it("debe requerir rol superadmin", async () => {
        const response = await request(app)
            .put("/customizations/641a9f0b2f7b88a9b8e7c999")
            .set("Authorization", "Bearer invalid.role.token");
    
        expect(response.statusCode).toBe(401);
        });
    });

  describe("GET /customizations/:id", () => {
    it("debe requerir autenticación", async () => {
      const response = await request(app).get("/customizations/1");
      expect(response.statusCode).toBe(401);
    });

  });

  describe("DELETE /customizations/:id", () => {
    it("debe requerir autenticación", async () => {
      const response = await request(app).delete("/customizations/1");
      expect(response.statusCode).toBe(401);
    });

    it("debe requerir rol superadmin", async () => {
      const response = await request(app)
        .delete("/customizations/641a9f0b2f7b88a9b8e7c999")
        .set("Authorization", "Bearer invalid.role.token");

      expect(response.statusCode).toBe(401);
    });
  });
});
