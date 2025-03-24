import sinon from "sinon";
import { FragranceModel } from "../models";
import { fragranceService } from "../services";
import mongoose from "mongoose";

describe("FragranceService", () => {
  let createStub: sinon.SinonStub;
  let findStub: sinon.SinonStub;
  let findByIdStub: sinon.SinonStub;
  let findOneAndUpdateStub: sinon.SinonStub;
  let findByIdAndDeleteStub: sinon.SinonStub;

  beforeEach(() => {
    createStub = sinon.stub(FragranceModel, "create");
    findStub = sinon.stub(FragranceModel, "find");
    findByIdStub = sinon.stub(FragranceModel, "findById");
    findOneAndUpdateStub = sinon.stub(FragranceModel, "findOneAndUpdate");
    findByIdAndDeleteStub = sinon.stub(FragranceModel, "findByIdAndDelete");
  });

  afterEach(() => sinon.restore());

  describe("create()", () => {
    it("debe crear fragancia con datos válidos", async () => {
      const fragranceInput = {
        name: "Lavanda",
        color: "#A020F0",
        price: 20000,
      };

      createStub.resolves({ ...fragranceInput, _id: "123" });

      const result = await fragranceService.create(fragranceInput);

      expect(result).toMatchObject(fragranceInput);
      expect(createStub.calledWith(fragranceInput)).toBeTruthy();
    });
  });

  describe("update()", () => {
    it("debe actualizar solo color manteniendo otros valores", async () => {
      const updateInput = { color: "#00FF00" };
      const originalFragrance = {
        _id: "123",
        name: "Menta",
        color: "#FF0000",
        price: 18000,
      };

      findOneAndUpdateStub.resolves({ ...originalFragrance, ...updateInput });

      const result = await fragranceService.update("123", updateInput);

      expect(result?.color).toBe("#00FF00");
      expect(result?.name).toBe("Menta");
    });
  });

  describe("delete()", () => {
    it("debe eliminar una fragancia", async () => {
      const fragranceId = "123";

      findByIdAndDeleteStub.resolves({ _id: fragranceId });

      const result = await fragranceService.delete(fragranceId);

      expect(result?._id).toBe(fragranceId);
    });
  });
  describe("findAll()", () => {
    it("debe retornar todas las fragancias", async () => {
      const fragrances = [
        { _id: "123", name: "Lavanda", color: "#A020F0", price: 20000 },
        { _id: "456", name: "Menta", color: "#00FF00", price: 18000 },
      ];

      findStub.resolves(fragrances);

      const result = await fragranceService.findAll();

      expect(result).toMatchObject(fragrances);
    });
  });

  describe("findById()", () => {
    it("debe retornar una fragancia por id", async () => {
      const fragranceId = "123";
      const fragrance = {
        _id: fragranceId,
        name: "Lavanda",
        color: "#A020F0",
        price: 20000,
      };

      findByIdStub.resolves(fragrance);

      const result = await fragranceService.findById(fragranceId);

      expect(result).toMatchObject(fragrance);
    });
  });
});
