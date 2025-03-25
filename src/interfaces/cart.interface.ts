import { ICandleCustomization, IGift  } from "../interfaces";

export interface ICart {
  _id: string;
  userId: string;
  items: ICartItem[];
}

export interface ICartItem {
  candleId: ICandleCustomization["_id"] 
  quantity: number;
}

export interface IGiftItem {
  giftId: IGift["_id"];
  quantity: number;
}



export interface CartInput {
  userId: string;
  items: ICartItem[];
  gifts?: IGiftItem[];
}

export interface CartUpdateInput {
  items?: ICartItem[];
  gifts?: IGiftItem[];
}
