import { ICandleCustomization } from "./candle.interface";

export interface ICart {
  _id: string;
  userId: string;
  items: ICartItem[];
}

export interface ICartItem {
  candleId: ICandleCustomization["_id"];
  quantity: number;
}

export interface CartInput {
  userId: string;
  items: ICartItem[];
}

export interface CartUpdateInput {
  items?: ICartItem[];
}
