  // Predefined fragrance interface
  export interface IFragrance {
      _id: string; // Unique identifier for the fragrance
      name: string; // Name of the fragrance
      color: string; // Assigned color of the fragrance
      price: number; // Price of the fragrance
  }
  
  // Input interface for creating a new fragrance
  export interface FragranceInput {
      name: string; // Name of the fragrance
      color: string; // Assigned color of the fragrance
      price: number; // Price of the fragrance
  }
  
  // Input interface for updating an existing fragrance
  export interface FragranceUpdateInput {
      name?: string; // Optional name of the fragrance
      color?: string; // Optional assigned color of the fragrance
      price?: number; // Optional price of the fragrance
  }