import sinon from "sinon";
import { UserModel } from "../models";
import { userService } from "../services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthError } from "../exceptions";
import mongoose from "mongoose";
import { UserInput } from "../interfaces";

describe("UserService", () => {
  process.env.JWT_SECRET = "test_secret";
  let findOneStub: sinon.SinonStub;
  let createStub: sinon.SinonStub;
  let compareStub: sinon.SinonStub;
  let hashStub: sinon.SinonStub;
  let signStub: sinon.SinonStub;

  beforeEach(() => {
    findOneStub = sinon.stub(UserModel, "findOne");
    createStub = sinon.stub(UserModel, "create");
    compareStub = sinon.stub(bcrypt, "compare");
    hashStub = sinon.stub(bcrypt, "hash");
    signStub = sinon.stub(jwt, "sign");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("create()", () => {
    it("Debería crear usuario con contraseña encriptada", async () => {
      const userInput: UserInput = {
        name: "Test User",
        email: "test@test.com",
        password: "password123",
        age: 25,
        roles: ["client"],
      };

      hashStub.resolves("hashedPassword");
      createStub.resolves({
        ...userInput,
        _id: new mongoose.Types.ObjectId(),
        password: "hashedPassword",
      });

      const result = await userService.create(userInput);

      expect(hashStub.calledWith("password123", 10)).toBeTruthy();
      expect(
        createStub.calledWith(sinon.match({ password: "hashedPassword" }))
      ).toBeTruthy();
      expect(result.password).toBe("hashedPassword");
    });

    it("Debería lanzar error si el email ya existe", async () => {
      const userInput: UserInput = {
        email: "exist@test.com",
        password: "password123",
        name: "Test",
        age: 30,
        roles: ["client"],
      };

      findOneStub.resolves({ email: "exist@test.com" });

      await expect(userService.create(userInput)).rejects.toThrow(
        ReferenceError
      );
    });

    it("Debería manejar error de base de datos", async () => {
      const userInput: UserInput = {
        email: "test@test.com",
        password: "password123",
        name: "Test",
        age: 30,
        roles: ["client"],
      };

      createStub.rejects(new Error("Database connection failed"));

      await expect(userService.create(userInput)).rejects.toThrow(
        "Database connection failed"
      );
    });
  });

  describe("login()", () => {
    it("Debería generar token JWT válido", async () => {
      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        email: "test@test.com",
        password: await bcrypt.hash("password123", 10),
        name: "Test User",
        age: 25,
        roles: ["client"],
      };

      findOneStub.resolves(mockUser);
      compareStub.resolves(true);
      signStub.returns("fake.jwt.token");

      const result = await userService.login({
        email: "test@test.com",
        password: "password123",
      });

      console.log(JSON.stringify(signStub.args, null, 2));

      expect(
        signStub.calledWith(
          sinon.match({
            user: {
              email: mockUser.email,
              name: mockUser.name,
              roles: mockUser.roles,
            },
          }),
          process.env.JWT_SECRET,
          sinon.match({ expiresIn: "10m" }) // Valida solo la parte relevante
        )
      ).toBeTruthy();

      expect(result?.user.token).toBe("fake.jwt.token");
    });

    it("Debería lanzar error con credenciales incorrectas", async () => {
      findOneStub.resolves(null);

      await expect(
        userService.login({
          email: "wrong@test.com",
          password: "wrong",
        })
      ).rejects.toThrow(AuthError);
    });

    it("Debería manejar error de comparación de contraseñas", async () => {
      const mockUser = {
        email: "test@test.com",
        password: "hashedPassword",
      };

      findOneStub.resolves(mockUser);
      compareStub.rejects(new Error("Comparison error"));

      await expect(
        userService.login({
          email: "test@test.com",
          password: "password123",
        })
      ).rejects.toThrow("Comparison error");
    });
  });
});
