import { Request, Response } from "express";
import { FragranceDocument } from "../models";
import { FragranceInput } from "../interfaces";
import { fragranceService } from "../services";

class FragranceController {
  public async create(req: Request, res: Response) {
    try {
      const newFragrance: FragranceDocument = await fragranceService.create(
        req.body as FragranceInput
      );
      res.status(201).json(newFragrance);
    } catch (error) {
      if (error instanceof ReferenceError) {
        res.status(400).json({ message: "Fragrance already exists" });
        return;
      }
      res.status(500).json(error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const fragrance: FragranceDocument | null = await fragranceService.findById(id);
      if (fragrance === null) {
        res.status(404).json({ message: `Fragrance with id ${id} not found` });
        return;
      }
      res.json(fragrance);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const fragrances: FragranceDocument[] = await fragranceService.findAll();
      res.json(fragrances);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const fragrance: FragranceDocument | null = await fragranceService.update(
        id,
        req.body as FragranceInput
      );
      if (fragrance === null) {
        res.status(404).json({ message: `Fragrance with id ${id} not found` });
        return;
      }
      res.json(fragrance);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const fragrance: FragranceDocument | null = await fragranceService.delete(id);
      if (fragrance === null) {
        res.status(404).json({ message: `Fragrance with id ${id} not found` });
        return;
      }
      res.json(fragrance);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export const fragranceController = new FragranceController();
