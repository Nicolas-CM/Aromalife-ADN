export interface UserInput {
  name: string;
  email: string;
  password: string;
  age: number;
  roles: string[];
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
    roles: string[];
    token: string;
    age: number;
  };
}
