import sinon from "sinon";
import {
  CandleCustomizationModel,
  ContainerModel,
  FragranceModel,
  UserModel,
} from "../models";
import { candleCustomizationService } from "../services";
import { CandleCustomizationInput } from "../interfaces";

describe("CandleCustomizationService", () => {
  let findByIdStub: sinon.SinonStub;
  let createStub: sinon.SinonStub;
  let findByIdAndUpdateStub: sinon.SinonStub;
  let findByIdAndDeleteStub: sinon.SinonStub;

  beforeEach(() => {
    findByIdStub = sinon.stub(CandleCustomizationModel, "findById");
    createStub = sinon.stub(CandleCustomizationModel, "create");
    findByIdAndUpdateStub = sinon.stub(
      CandleCustomizationModel,
      "findByIdAndUpdate"
    );
    findByIdAndDeleteStub = sinon.stub(
      CandleCustomizationModel,
      "findByIdAndDelete"
    );
  });

  afterEach(() => sinon.restore());

  describe("create()", () => {
    it("debe crear una personalización de vela con datos válidos", async () => {
      const candleInput: CandleCustomizationInput = {
        userId: "user123",
        containerId: "container123",
        fragranceId: "fragrance123",
        customImage: "https://example.com/image.jpg",
      };

      sinon.stub(ContainerModel, "findById").resolves({} as any);
      sinon.stub(FragranceModel, "findById").resolves({} as any);
      sinon.stub(UserModel, "findById").resolves({} as any);
      createStub.resolves({ ...candleInput, _id: "candle123" });

      const result = await candleCustomizationService.create(candleInput);

      expect(result).toHaveProperty("_id", "candle123");
      expect(createStub.calledOnce).toBeTruthy();
    });

    it("debe lanzar un error si el contenedor no existe", async () => {
      const candleInput: CandleCustomizationInput = {
        userId: "user123",
        containerId: "invalid-container",
        fragranceId: "fragrance123",
        customImage: "https://example.com/image.jpg",
      };

      sinon.stub(ContainerModel, "findById").resolves(null);

      await expect(
        candleCustomizationService.create(candleInput)
      ).rejects.toThrow(ReferenceError);
    });
  });

  describe("findById()", () => {
    it("debe retornar una personalización de vela por id", async () => {
      const candle = {
        populate: sinon.stub().resolvesThis(), // Simula el método populate()
        _id: "candle123",
        containerId: { name: "Vaso Grande" },
        fragranceId: { name: "Lavanda" },
      };

      findByIdStub.resolves(candle);

      const result = await candleCustomizationService.findById("candle123");

      expect(result).toMatchObject(candle);
      expect(findByIdStub.calledWith("candle123")).toBeTruthy();
    });

    it("debe lanzar un error si la personalización no existe", async () => {
      findByIdStub.resolves(null);

      await expect(
        candleCustomizationService.findById("invalid-id")
      ).rejects.toThrow(ReferenceError);
    });
  });

  describe("update()", () => {
    it("debe actualizar una personalización de vela existente", async () => {
      const updateData = { customImage: "https://example.com/new-image.jpg" };
      const updatedCandle = { ...updateData, _id: "candle123" };

      findByIdAndUpdateStub.resolves(updatedCandle);

      const result = await candleCustomizationService.update(
        "candle123",
        updateData
      );

      expect(result).toMatchObject(updatedCandle);
      expect(
        findByIdAndUpdateStub.calledWith("candle123", updateData, {
          returnOriginal: false,
        })
      ).toBeTruthy();
    });

    it("debe lanzar un error si la personalización no existe", async () => {
      findByIdAndUpdateStub.resolves(null);

      await expect(
        candleCustomizationService.update("invalid-id", {})
      ).rejects.toThrow(ReferenceError);
    });
  });

  describe("delete()", () => {
    it("debe eliminar una personalización de vela existente", async () => {
      const deletedCandle = { _id: "candle123" };

      findByIdAndDeleteStub.resolves(deletedCandle);

      const result = await candleCustomizationService.delete("candle123");

      expect(result).toMatchObject(deletedCandle);
      expect(findByIdAndDeleteStub.calledWith("candle123")).toBeTruthy();
    });

    it("debe lanzar un error si la personalización no existe", async () => {
      findByIdAndDeleteStub.resolves(null);

      await expect(
        candleCustomizationService.delete("invalid-id")
      ).rejects.toThrow(ReferenceError);
    });
  });
});
