import { CandleCustomizationModel } from "../models/candle.model";

describe("CandleCustomizationModel", () => {
  it("debe requerir el usuario", async () => {
    const customization = new CandleCustomizationModel({
      containerId: "60b8a45f9f1b2c0017a1d4d5",
      fragranceId: "60b8a45f9f1b2c0017a1d4d6",
      customImage: "https://example.com/image.jpg",
    });

    const error = customization.validateSync();
    expect(error?.errors.user).toBeDefined();
  });

  it("debe requerir containerId", async () => {
    const customization = new CandleCustomizationModel({
      user: "user123",
      fragranceId: "60b8a45f9f1b2c0017a1d4d6",
      customImage: "https://example.com/image.jpg",
    });

    const error = customization.validateSync();
    expect(error?.errors.containerId).toBeDefined();
  });

  it("debe requerir fragranceId", async () => {
    const customization = new CandleCustomizationModel({
      user: "user123",
      containerId: "60b8a45f9f1b2c0017a1d4d5",
      customImage: "https://example.com/image.jpg",
    });

    const error = customization.validateSync();
    expect(error?.errors.fragranceId).toBeDefined();
  });

  it("debe requerir customImage", async () => {
    const customization = new CandleCustomizationModel({
      user: "user123",
      containerId: "60b8a45f9f1b2c0017a1d4d5",
      fragranceId: "60b8a45f9f1b2c0017a1d4d6",
    });

    const error = customization.validateSync();
    expect(error?.errors.customImage).toBeDefined();
  });

  it("debe asignar el estado por defecto como 'draft'", async () => {
    const customization = new CandleCustomizationModel({
      user: "user123",
      containerId: "60b8a45f9f1b2c0017a1d4d5",
      fragranceId: "60b8a45f9f1b2c0017a1d4d6",
      customImage: "https://example.com/image.jpg",
    });

    expect(customization.status).toBe("draft");
  });

  it("debe permitir solo valores válidos para el estado", async () => {
    const customization = new CandleCustomizationModel({
      user: "user123",
      containerId: "60b8a45f9f1b2c0017a1d4d5",
      fragranceId: "60b8a45f9f1b2c0017a1d4d6",
      customImage: "https://example.com/image.jpg",
      status: "invalid-status",
    });

    const error = customization.validateSync();
    expect(error?.errors.status).toBeDefined();
  });
});
