// Interface representing a user
export interface IUser {
  _id: string; // Unique identifier for the user
  name: string; // Name of the user
  email: string; // Email address of the user
  password: string; // Password of the user
  age: number; // Age of the user
  roles: ("client" | "superadmin" | "manager")[]; // Array of roles assigned to the user
}

// Input interface for creating a new user
export interface UserInput {
  name: string; // Name of the user
  email: string; // Email address of the user
  password: string; // Password of the user
  age: number; // Age of the user
  roles: ("client" | "superadmin" | "manager")[]; // Array of roles assigned to the user
}

// Input interface for updating an existing user
export interface UserInputUpdate {
  name: string; // Name of the user
  email: string; // Email address of the user
  age: number; // Age of the user
}

// Input interface for user login
export interface UserLogin {
  email: string; // Email address of the user
  password: string; // Password of the user
}

// Response interface for user login
export interface UserLoginResponse {
  user: {
    id: string; // Unique identifier for the user
    name: string; // Name of the user
    email: string; // Email address of the user
    roles: ("client" | "superadmin" | "manager")[]; // Array of roles assigned to the user
    token: string; // Authentication token for the user
    age: number; // Age of the user
  };
}