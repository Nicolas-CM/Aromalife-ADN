// Interface representing a gift
export interface IGift {
    _id: string; // Unique identifier for the gift
    name: string; // Name of the gift
    description?: string; // Optional description of the gift
    price: number; // Price of the gift
    imageUrl?: string; // Optional URL of the gift's image
}

// Input interface for creating a new gift
export interface GiftInput {
    name: string; // Name of the gift
    description?: string; // Optional description of the gift
    price: number; // Price of the gift
    imageUrl?: string; // Optional URL of the gift's image
}