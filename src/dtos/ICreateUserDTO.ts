interface ICreateUserDTO {
  id: string;
  name: string;
  password: string;
  email: string;
  phone: number;
  address: string;
}

export { ICreateUserDTO };