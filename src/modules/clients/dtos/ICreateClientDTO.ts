interface ICreateClientDTO {
  username: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  birth_date: Date;
  address_id: string;
}

export type { ICreateClientDTO };
