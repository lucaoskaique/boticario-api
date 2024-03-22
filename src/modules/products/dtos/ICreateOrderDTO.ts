interface ICreateOrderDTO {
  amount: number;
  order_date: Date;
  status: string;
  client_id: string;
}

export type { ICreateOrderDTO };
