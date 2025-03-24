import { Request, Response } from "express";
import { ContainerDocument } from "../models";
import { ContainerInput } from "../interfaces";
import { containerService } from "../services";

class ContainerController {
  public async create(req: Request, res: Response) {
    try {

        // Calcular el diámetro como promedio de la altura y el ancho
      const { height, width, ...rest } = req.body as ContainerInput;
      const diameter = (height + width) / 2;

      const newContainer: ContainerDocument = await containerService.create({
        ...rest,
        height,
        width,
        diameter,
      });
      res.status(201).json(newContainer);
    } catch (error) {
      if (error instanceof ReferenceError) {
        res.status(400).json({ message: "Container already exists" });
        return;
      }
      res.status(500).json(error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const container: ContainerDocument | null = await containerService.findById(id);
      if (container === null) {
        res.status(404).json({ message: `Container with id ${id} not found` });
        return;
      }
      res.json(container);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const containers: ContainerDocument[] = await containerService.findAll();
      res.json(containers);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const container: ContainerDocument | null = await containerService.update(
        id,
        req.body as ContainerInput
      );
      if (container === null) {
        res.status(404).json({ message: `Container with id ${id} not found` });
        return;
      }
      res.json(container);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const container: ContainerDocument | null = await containerService.delete(id);
      if (container === null) {
        res.status(404).json({ message: `Container with id ${id} not found` });
        return;
      }
      res.json(container);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export const containerController = new ContainerController();
