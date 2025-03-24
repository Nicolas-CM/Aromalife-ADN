import { UserModel } from "../models";

describe("UserModel", () => {
  it("Debería requerir campos obligatorios", async () => {
    const user = new UserModel();

    const error = user.validateSync();

    expect(error?.errors.name).toBeDefined();
    expect(error?.errors.email).toBeDefined();
    expect(error?.errors.password).toBeDefined();
    expect(error?.errors.age).toBeDefined();
  });

  it("Debería permitir la creación de un usuario válido", async () => {
    const user = new UserModel({
      name: "Test User",
      email: "test@test.com",
      password: "password123",
      age: 30,
      roles: ["client"],
    });

    const error = user.validateSync();

    expect(error).toBeUndefined(); // No debe haber errores
  });

  it("Debería aceptar un usuario sin roles (opcional)", async () => {
    const user = new UserModel({
      name: "Test User",
      email: "test@test.com",
      password: "password123",
      age: 30,
    });

    const error = user.validateSync();

    expect(error).toBeUndefined();
  });

  it("Debería aceptar múltiples roles permitidos", async () => {
    const user = new UserModel({
      name: "Test User",
      email: "test@test.com",
      password: "password123",
      age: 30,
      roles: ["client", "manager"],
    });

    const error = user.validateSync();

    expect(error).toBeUndefined();
  });

  it("Debería rechazar una edad no numérica", async () => {
    const user = new UserModel({
      name: "Test User",
      email: "test@test.com",
      password: "password123",
      age: "not-a-number", // Edad inválida
      roles: ["client"],
    });

    const error = user.validateSync();

    expect(error?.errors.age).toBeDefined();
  });

  it("Debería rechazar un usuario sin email", async () => {
    const user = new UserModel({
      name: "Test User",
      password: "password123",
      age: 30,
      roles: ["client"],
    });

    const error = user.validateSync();

    expect(error?.errors.email).toBeDefined();
  });
});
