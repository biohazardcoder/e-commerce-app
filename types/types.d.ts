export interface ClothTypes {
  _id: string;
  title: string;
  price: number;
  category: string;
  company: string;
  stock: number;
  size: string;     
  quantity: number;
  color: string;
  sale: number;
  photos: string[]; 
  total: number;
  id: string;
}

export interface AdminTypes {
  createdAt: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  updatedAt: string;
  avatar?:string
  _id: string;
  address:string
}