import { CartModel } from "../models/cart.model";

describe("Cart Model", () => {
  it("debe requerir userId", async () => {
    const cart = new CartModel({
      items: [{ productId: "prod123", quantity: 1 }],
    });

    const error = cart.validateSync();
    expect(error?.errors.userId).toBeDefined();
  });

  it("debe validar cantidad mínima", async () => {
    const cart = new CartModel({
      userId: "user123",
      items: [{ productId: "prod123", quantity: 0 }],
    });

    const error = cart.validateSync();
    expect(error?.errors["items.0.quantity"]).toBeDefined();
  });
});
