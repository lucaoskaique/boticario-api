interface ICreateAddressDTO {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  street_number: number;
  complement: string;
  uf: string;
}

export type { ICreateAddressDTO };
