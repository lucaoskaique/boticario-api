interface ICreateClientDTO {
  username: string;
  name?: string;
  email?: string;
  password: string;
  cpf: string;
  phone?: string;
  birth_date?: Date;
  address_id: string;
}

export type { ICreateClientDTO };
