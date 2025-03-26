import request from "supertest";
import express from "express";
import { containerRouter } from "../routes/container.route";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use("/containers", containerRouter);

describe("Container Routes", () => {
  describe("POST /containers", () => {
    it("debe requerir rol superadmin", async () => {
      jest.spyOn(jwt, "verify").mockReturnValue({
  user: {
    id: "testUserId",
    roles: ["client"],
  },
} as any);

      const response = await request(app)
        .post("/containers")
        .set("Authorization", "Bearer invalid.role.token")
        .send({
          name: "Vaso",
          imageUrl: "https://example.com/vaso.jpg",
          price: 10000,
          height: 10,
          width: 5,
        });

        console.log(response);

      expect(response.statusCode).toBe(403);
    });
  });

  describe("PUT /containers/:id", () => {
    it("debe requerir rol superadmin", async () => {
      jest.spyOn(jwt, "verify").mockReturnValue({ user: {
        id: "testUserId",
        roles: ["client"],
      }, } as any);

      const response = await request(app)
        .put("/containers/123")
        .set("Authorization", "Bearer invalid.role.token")
        .send({
          name: "Vaso",
          imageUrl: "https://example.com/vaso.jpg",
          price: 10000,
          height: 10,
          width: 5,
        });

      expect(response.statusCode).toBe(403);
    });
  });

  describe("DELETE /containers/:id", () => {
    it("debe requerir rol superadmin", async () => {
      jest.spyOn(jwt, "verify").mockReturnValue({user: {
        id: "testUserId",
        roles: ["client"],
      },} as any);

      const response = await request(app)
        .delete("/containers/123")
        .set("Authorization", "Bearer invalid.role.token");

      expect(response.statusCode).toBe(403);
    });
  });
});
