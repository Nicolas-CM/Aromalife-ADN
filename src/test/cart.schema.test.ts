import { cartSchema } from "../schemas/cart.schema";

describe("Cart Schema", () => {
  it("debe validar estructura correcta", () => {
    const validData = {
      userId: "507f1f77bcf86cd799439011",
      items: [
        {
          candleId: "5ebbe53423b8c7a9d3456789",
          quantity: 2,
        },
      ],
      gifts: [
        {
          giftId: "5ebbe53423b8c7a9d3456789",
          quantity: 1,
        },
      ],
    };

    expect(() => cartSchema.parse(validData)).not.toThrow();
  });

  it("debe rechazar ID de usuario inválido", () => {
    const invalidData = {
      userId: "invalid-id",
      items: [],
    };

    expect(() => cartSchema.parse(invalidData)).toThrow(
      "Invalid ObjectId format"
    );
  });
});
