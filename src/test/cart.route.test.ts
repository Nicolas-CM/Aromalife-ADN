import request from "supertest";
import express from "express";
import { cartRouter } from "../routes/cart.route";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use("/carts", cartRouter);

describe("Cart Routes", () => {
  describe("POST /carts", () => {
    it("debe requerir autenticación", async () => {
      const response = await request(app).post("/carts").send({});

      expect(response.statusCode).toBe(401);
    });

    it("debe validar esquema con token válido", async () => {
      jest.spyOn(jwt, "verify").mockReturnValue({ roles: ["client"] } as any);

      const response = await request(app)
        .post("/carts")
        .set("Authorization", "Bearer valid.token")
        .send({ userId: "invalid" });

      expect(response.statusCode).toBe(401);
    });
  });
});
