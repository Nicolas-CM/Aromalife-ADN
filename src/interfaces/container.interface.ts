// Contenedor predefinido
export interface IContainer {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    height: number;
    width: number;
    diameter?: number;
  }
  
  export interface ContainerInput {
    name: string;
    description?: string;
    imageUrl: string;
    price: number;
    height: number;
    width: number;
    diameter?: number;
  }

  export interface ContainerUpdateInput {
    name?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    height?: number;
    width?: number;
    diameter?: number;
  }
  