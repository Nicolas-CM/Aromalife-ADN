// Predefined container interface
export interface IContainer {
    _id: string; // Unique identifier for the container
    name: string; // Name of the container
    imageUrl: string; // URL of the container's image
    price: number; // Price of the container
    height: number; // Height of the container
    width: number; // Width of the container
    diameter?: number; // Optional diameter of the container
}

// Input interface for creating a new container
export interface ContainerInput {
    name: string; // Name of the container
    description?: string; // Optional description of the container
    imageUrl: string; // URL of the container's image
    price: number; // Price of the container
    height: number; // Height of the container
    width: number; // Width of the container
    diameter?: number; // Optional diameter of the container
}

// Input interface for updating an existing container
export interface ContainerUpdateInput {
    name?: string; // Optional name of the container
    description?: string; // Optional description of the container
    imageUrl?: string; // Optional URL of the container's image
    price?: number; // Optional price of the container
    height?: number; // Optional height of the container
    width?: number; // Optional width of the container
    diameter?: number; // Optional diameter of the container
}