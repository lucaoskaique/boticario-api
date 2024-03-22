interface ICreateProductDTO {
  name: string;
  description: string;
  price: number;
  inventory_count: number;
  category_id: string;
  image_url: string;
}

export type { ICreateProductDTO };
