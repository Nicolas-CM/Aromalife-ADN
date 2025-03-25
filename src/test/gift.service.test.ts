import sinon from "sinon";
import { GiftModel } from "../models";
import { giftService } from "../services";

describe("GiftService", () => {
  let createStub: sinon.SinonStub;
  let findStub: sinon.SinonStub;
  let findByIdStub: sinon.SinonStub;
  let findOneAndUpdateStub: sinon.SinonStub;
  let findByIdAndDeleteStub: sinon.SinonStub;

  beforeEach(() => {
    createStub = sinon.stub(GiftModel, "create");
    findStub = sinon.stub(GiftModel, "find");
    findByIdStub = sinon.stub(GiftModel, "findById");
    findOneAndUpdateStub = sinon.stub(GiftModel, "findOneAndUpdate");
    findByIdAndDeleteStub = sinon.stub(GiftModel, "findByIdAndDelete");
  });

  afterEach(() => sinon.restore());

  describe("create()", () => {
    it("debe crear regalo con datos válidos", async () => {
      const giftInput = {
        name: "Flores",
        description: "Ramo de flores frescas",
        price: 20000,
        imageUrl: "https://example.com/flores.jpg",
      };

      createStub.resolves({ ...giftInput, _id: "123" });

      const result = await giftService.create(giftInput);

      expect(result).toMatchObject(giftInput);
      expect(createStub.calledWith(giftInput)).toBeTruthy();
    });
  });

  describe("update()", () => {
    it("debe actualizar solo el precio manteniendo otros valores", async () => {
      const updateInput = { price: 25000 };
      const originalGift = {
        _id: "123",
        name: "Flores",
        description: "Ramo de flores frescas",
        price: 20000,
        imageUrl: "https://example.com/flores.jpg",
      };

      findOneAndUpdateStub.resolves({ ...originalGift, ...updateInput });

      const result = await giftService.update("123", updateInput);

      expect(result?.price).toBe(25000);
      expect(result?.name).toBe("Flores");
    });
  });

  describe("delete()", () => {
    it("debe eliminar un regalo", async () => {
      const giftId = "123";

      findByIdAndDeleteStub.resolves({ _id: giftId });

      const result = await giftService.delete(giftId);

      expect(result?._id).toBe(giftId);
    });
  });

  describe("findAll()", () => {
    it("debe retornar todos los regalos", async () => {
      const gifts = [
        { _id: "123", name: "Flores", price: 20000 },
        { _id: "456", name: "Chocolates", price: 15000 },
      ];

      findStub.resolves(gifts);

      const result = await giftService.findAll();

      expect(result).toMatchObject(gifts);
    });
  });

  describe("findById()", () => {
    it("debe retornar un regalo por id", async () => {
      const giftId = "123";
      const gift = {
        _id: giftId,
        name: "Flores",
        description: "Ramo de flores frescas",
        price: 20000,
        imageUrl: "https://example.com/flores.jpg",
      };

      findByIdStub.resolves(gift);

      const result = await giftService.findById(giftId);

      expect(result).toMatchObject(gift);
    });
  });
});
