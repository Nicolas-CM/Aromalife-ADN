import { Request, Response } from "express";
import { CartDocument } from "../models";
import { CartInput, CartUpdateInput } from "../interfaces";
import { cartService } from "../services";

class CartController {
  public async create(req: Request, res: Response) {
    try {
      const newCart: CartDocument = await cartService.create(
        req.body as CartInput
      );
      res.status(201).json(newCart);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const cart: CartDocument | null = await cartService.findById(id);
      if (cart === null) {
        res.status(404).json({ message: `Cart with id ${id} not found` });
        return;
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const carts: CartDocument[] = await cartService.findAll();
      res.json(carts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const cart: CartDocument | null = await cartService.update(
        id,
        req.body as CartUpdateInput
      );
      if (cart === null) {
        res.status(404).json({ message: `Cart with id ${id} not found` });
        return;
      }
      res.json(cart);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const cart: CartDocument | null = await cartService.delete(id);
      if (cart === null) {
        res.status(404).json({ message: `Cart with id ${id} not found` });
        return;
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export const cartController = new CartController();
