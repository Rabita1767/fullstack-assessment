export interface ISignup {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  address: string;
  phone: string;
}

export interface IProductInput {
  title: string;
  description: string;
  price: number;
  rent: number;
  category: string[];
}
