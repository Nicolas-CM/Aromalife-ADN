import { FragranceModel } from "../models/fragrance.model";

it("debe guardar color en formato hexadecimal", async () => {
  const fragrance = new FragranceModel({
    name: "Azul",
    color: "#0000FF",
    price: 15000,
  });

  const error = fragrance.validateSync();
  expect(error).toBeUndefined();
});

it("debe requerir precio ", async () => {
  const fragrance = new FragranceModel({
    name: "Rojo",
    color: "#FF0000",
  });

  const error = fragrance.validateSync();
  expect(error?.errors.price).toBeDefined();
});

it("debe requerir nombre ", async () => {
  const fragrance = new FragranceModel({
    color: "#FF0000",
    price: 20000,
  });

  const error = fragrance.validateSync();
  expect(error?.errors.name).toBeDefined();
});

it("debe requerir color ", async () => {
  const fragrance = new FragranceModel({
    name: "Verde",
    price: 20000,
  });

  const error = fragrance.validateSync();
  expect(error?.errors.color).toBeDefined();
});
