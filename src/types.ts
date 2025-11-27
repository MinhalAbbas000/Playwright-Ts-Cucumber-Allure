export interface User {
  username: string;
  password: string;
}

export interface LoginData {
  validUser: User;
  invalidUser: User;
  emptyUser: User;
}

export interface Product {
  title: string;
  description: string;
  price: number;
}




