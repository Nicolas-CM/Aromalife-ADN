export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  roles: ("client" | "superadmin" | "manager")[];
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  age: number;
  roles: ("client" | "superadmin" | "manager")[];
}

export interface UserInputUpdate {
  name: string;
  email: string;
  age: number;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    roles: ("client" | "superadmin" | "manager")[];
    token: string;
    age: number;
  };
}
