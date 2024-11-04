import { Restaurant } from "./Restaurant";

export interface Partner {
    name: string;
    email: string;
    phone: string;
    restaurants: Restaurant[]
}
