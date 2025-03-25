import { Request, Response } from "express";
import { GiftDocument } from "../models";
import { GiftInput } from "../interfaces";
import { giftService } from "../services";

class GiftController {
  public async create(req: Request, res: Response) {
    try {
      const newGift: GiftDocument = await giftService.create(req.body as GiftInput);
      res.status(201).json(newGift);
    } catch (error) {
      if (error instanceof ReferenceError) {
        res.status(400).json({ message: "Gift already exists" });
        return;
      }
      res.status(500).json(error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const gift: GiftDocument | null = await giftService.findById(id);
      if (gift === null) {
        res.status(404).json({ message: `Gift with id ${id} not found` });
        return;
      }
      res.json(gift);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const gifts: GiftDocument[] = await giftService.findAll();
      res.json(gifts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const gift: GiftDocument | null = await giftService.update(id, req.body as Partial<GiftInput>);
      if (gift === null) {
        res.status(404).json({ message: `Gift with id ${id} not found` });
        return;
      }
      res.json(gift);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const gift: GiftDocument | null = await giftService.delete(id);
      if (gift === null) {
        res.status(404).json({ message: `Gift with id ${id} not found` });
        return;
      }
      res.json({ message: "Gift deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export const giftController = new GiftController();
