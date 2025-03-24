import { ContainerModel } from "../models/container.model";

describe("Container Model", () => {
  it("debe requerir precio positivo", async () => {
    const container = new ContainerModel({
      name: "Vaso",
      imageUrl: "https://example.com/vaso.jpg",
      price: -100,
      height: 10,
      width: 5,
    });

    const error = container.validateSync();
    expect(error?.errors.price).toBeDefined();
  });

  it("debe aceptar diámetro calculado", async () => {
    const container = new ContainerModel({
      name: "Jarra",
      imageUrl: "https://example.com/jarra.jpg",
      price: 25000,
      height: 25,
      width: 15,
      diameter: 20,
    });

    const error = container.validateSync();
    expect(error).toBeUndefined();
  });
});
