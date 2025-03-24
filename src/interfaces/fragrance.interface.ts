  // Fragancia predefinida
  export interface IFragrance {
    _id: string;
    name: string;
    color: string; // Color asignado
    price: number;
  }

  export interface FragranceInput {
    name: string;
    color: string;
    price: number;
  }

  export interface FragranceUpdateInput {
    name?: string;
    color?: string;
    price?: number;
  }
  