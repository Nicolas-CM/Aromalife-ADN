import { FragranceModel } from "../models/fragrance.model";

describe("Fragrance Model", () => {
  it("debe guardar nombre, precio y color", async () => {
    const fragrance = new FragranceModel({
      name: "Azul",
      color: "Azul",
      price: 15000,
    });
    const fraganceMongo = await fragrance.save();
    expect(fraganceMongo._id).toBeDefined();
    expect(fraganceMongo.name).toBe("Azul");
    expect(fraganceMongo.color).toBe("Azul");
    expect(fraganceMongo.price).toBe(15000);
  });

  it("debe guardar color en formato hexadecimal", async () => {
    const fragrance = new FragranceModel({
      name: "Azul",
      color: "#0000FF",
      price: 15000,
    });

    const error = fragrance.validateSync();
    expect(error).toBeUndefined();
  });
});
