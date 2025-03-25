export interface IGift {
    _id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
}

export interface GiftInput {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
}