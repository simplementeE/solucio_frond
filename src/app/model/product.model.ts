export interface Product {
  idProduct?: number;
  name: string;
  description: string;
  presentation: string;
  unitPrice: number;
  stock: number;
  expired: string; // formato ISO string
  idCategory: number;
  idFamily: number;
  idLaboratory: number;
}
