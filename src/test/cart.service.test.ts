import sinon from "sinon";
import { CartModel, UserModel, CandleCustomizationModel } from "../models";
import { cartService } from "../services";
import mongoose from "mongoose";

describe("CartService", () => {
  let existsStub: sinon.SinonStub;
  let createStub: sinon.SinonStub;
  let findStub: sinon.SinonStub;
  let findByIdStub: sinon.SinonStub;
  let findOneAndUpdateStub: sinon.SinonStub;
  let findByIdAndDeleteStub: sinon.SinonStub;

  beforeEach(() => {
    existsStub = sinon.stub(mongoose.Model, "exists");
    createStub = sinon.stub(CartModel, "create");
    findStub = sinon.stub(CartModel, "find");
    findByIdStub = sinon.stub(CartModel, "findById");
    findOneAndUpdateStub = sinon.stub(CartModel, "findOneAndUpdate");
    findByIdAndDeleteStub = sinon.stub(CartModel, "findByIdAndDelete");
  });

  afterEach(() => sinon.restore());

  describe("create()", () => {
    it("debe crear carrito con usuario y productos válidos", async () => {
      const cartInput = {
        userId: new mongoose.Types.ObjectId().toString(),
        items: [
          {
            candleId: new mongoose.Types.ObjectId().toString(),
            quantity: 2,
          },
        ],
      };

      existsStub.withArgs({ _id: cartInput.userId }).resolves(true);
      existsStub.withArgs({ _id: cartInput.items[0].candleId }).resolves(true);
      createStub.resolves({ ...cartInput, _id: "123" });

      const result = await cartService.create(cartInput);

      expect(result).toHaveProperty("_id", "123");
      expect(createStub.calledOnce).toBeTruthy();
    });

    it("debe lanzar error si usuario no existe", async () => {
      const cartInput = {
        userId: "invalid-user-id",
        items: [],
      };

      existsStub.withArgs({ _id: cartInput.userId }).resolves(false);

      await expect(cartService.create(cartInput)).rejects.toThrow(
        "User with id invalid-user-id does not exist"
      );
    });
  });

  describe("update()", () => {
    it("debe actualizar items del carrito", async () => {
      const updateInput = {
        items: [
          {
            candleId: new mongoose.Types.ObjectId().toString(),
            quantity: 3,
          },
        ],
      };

      existsStub.resolves(true);
      findOneAndUpdateStub.resolves({ _id: "123", ...updateInput });

      const result = await cartService.update("123", updateInput);

      expect(result?.items[0].quantity).toBe(3);
      expect(
        findOneAndUpdateStub.calledWith({ _id: "123" }, updateInput, {
          returnOriginal: false,
        })
      ).toBeTruthy();
    });

    it("debe lanzar error si producto no existe", async () => {
      const updateInput = {
        items: [
          {
            candleId: "invalid-candle-id",
            quantity: 2,
          },
        ],
      };

      existsStub.withArgs({ _id: updateInput.items[0].candleId }).resolves(false);

      await expect(cartService.update("123", updateInput)).rejects.toThrow(
        "Candle with id invalid-candle-id does not exist"
      );
    });
  });

  describe("delete()", () => {
    it("debe eliminar carrito existente", async () => {
      findByIdAndDeleteStub.resolves({ _id: "123" });

      const result = await cartService.delete("123");

      expect(result).toHaveProperty("_id", "123");
      expect(findByIdAndDeleteStub.calledWith("123")).toBeTruthy();
    });

    it("debe lanzar error si carrito no existe", async () => {
      findByIdAndDeleteStub.resolves(null);

      await expect(cartService.delete("invalid-id")).resolves.toBeNull();
    });
  });
});
