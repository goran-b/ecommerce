import { Product } from "./product.model";

export interface Order {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    items: [{
        product: Product;
        quantity: number;
    }]
    prize: number;
    imgUrl: string;
}