import sinon from "sinon";
import { ContainerModel } from "../models";
import { containerService } from "../services";
import mongoose from "mongoose";

describe("ContainerService", () => {
  let createStub: sinon.SinonStub;
  let findStub: sinon.SinonStub;
  let findByIdStub: sinon.SinonStub;
  let findOneAndUpdateStub: sinon.SinonStub;
  let findByIdAndDeleteStub: sinon.SinonStub;
  let findOneStub: sinon.SinonStub;

  beforeEach(() => {
    createStub = sinon.stub(ContainerModel, "create");
    findStub = sinon.stub(ContainerModel, "find");
    findByIdStub = sinon.stub(ContainerModel, "findById");
    findOneAndUpdateStub = sinon.stub(ContainerModel, "findOneAndUpdate");
    findByIdAndDeleteStub = sinon.stub(ContainerModel, "findByIdAndDelete");
    findOneStub = sinon.stub(ContainerModel, "findOne");
  });

  afterEach(() => sinon.restore());

  describe("create()", () => {
    it("debe crear un contenedor con datos válidos", async () => {
      const containerInput = {
        name: "Vaso Tradicional",
        imageUrl: "https://example.com/vaso.jpg",
        price: 15000,
        height: 20,
        width: 10,
      };

      createStub.resolves({ ...containerInput, _id: "123", diameter: 15 });

      findOneStub.resolves(null);

      const result = await containerService.create(containerInput);

      expect(result).toMatchObject({
        ...containerInput,
        diameter: 15,
      });
      expect(createStub.calledWith(containerInput)).toBeTruthy();
    });
  });

  describe("update()", () => {
    it("debe actualizar solo campos permitidos", async () => {
      const updateInput = {
        price: 20000,
        description: "Nueva descripción",
      };

      findOneAndUpdateStub.resolves({
        _id: "123",
        ...updateInput,
        name: "Vaso Tradicional",
      });

      const result = await containerService.update("123", updateInput);

      expect(result?.price).toBe(20000);
      expect(
        findOneAndUpdateStub.calledWith({ _id: "123" }, updateInput, {
          returnOriginal: false,
        })
      ).toBeTruthy();
    });

    it("debe retornar null si no se encuentra el contenedor", async () => {
      findOneAndUpdateStub.resolves(null);

      const result = await containerService.update("invalid-id", {});

      expect(result).toBeNull();
    });
  });

  describe("delete()", () => {
    it("debe eliminar un contenedor existente", async () => {
      findByIdAndDeleteStub.resolves({
        _id: "123",
        name: "Vaso Tradicional",
        imageUrl: "https://example.com/vaso.jpg",
        price: 15000,
        height: 20,
        width: 10,
      });

      const result = await containerService.delete("123");

      expect(result).toMatchObject({
        _id: "123",
        name: "Vaso Tradicional",
        imageUrl: "https://example.com/vaso.jpg",
        price: 15000,
        height: 20,
        width: 10,
      });
      expect(findByIdAndDeleteStub.calledWith("123")).toBeTruthy();
    });

    it("debe retornar null si no se encuentra el contenedor", async () => {
      findByIdAndDeleteStub.resolves(null);

      const result = await containerService.delete("invalid-id");

      expect(result).toBeNull();
    });
  });

  describe("get()", () => {
    it("debe retornar todos los contenedores", async () => {
      const containers = [
        {
          _id: "123",
          name: "Vaso Tradicional",
          imageUrl: "https://example.com/vaso.jpg",
          price: 15000,
          height: 20,
          width: 10,
        },
        {
          _id: "456",
          name: "Vaso Moderno",
          imageUrl: "https://example.com/vaso-moderno.jpg",
          price: 20000,
          height: 25,
          width: 15,
        },
      ];

      findStub.resolves(containers);

      const result = await containerService.findAll();

      expect(result).toMatchObject(containers);
      expect(findStub.calledOnce).toBeTruthy();
    });

    it("debe retornar un contenedor por id", async () => {
      const container = {
        _id: "123",
        name: "Vaso Tradicional",
        imageUrl: "https://example.com/vaso.jpg",
        price: 15000,
        height: 20,
        width: 10,
      };

      findByIdStub.resolves(container);

      const result = await containerService.findById("123");

      expect(result).toMatchObject(container);
      expect(findByIdStub.calledWith("123")).toBeTruthy();
    });

    it("debe retornar null si no se encuentra el contenedor", async () => {
      findByIdStub.resolves(null);

      const result = await containerService.findById("invalid-id");

      expect(result).toBeNull();
    });
  });
});
