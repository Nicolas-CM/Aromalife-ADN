import { GiftModel } from "../models/gift.model";

it("debe guardar el regalo correctamente con todos los campos", async () => {
  const gift = new GiftModel({
    name: "Flores",
    description: "Ramo de flores frescas",
    price: 20000,
    imageUrl: "https://example.com/flores.jpg",
  });

  const error = gift.validateSync();
  expect(error).toBeUndefined();
});

it("debe requerir precio", async () => {
  const gift = new GiftModel({
    name: "Chocolates",
    description: "Caja de chocolates",
    imageUrl: "https://example.com/chocolates.jpg",
  });

  const error = gift.validateSync();
  expect(error?.errors.price).toBeDefined();
});

it("debe requerir nombre", async () => {
  const gift = new GiftModel({
    description: "Botella de vino tinto",
    price: 30000,
    imageUrl: "https://example.com/vino.jpg",
  });

  const error = gift.validateSync();
  expect(error?.errors.name).toBeDefined();
});
