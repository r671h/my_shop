export type Product = {
    id:number,
    title:string,
    price:number,
    image:string,
    description:string,
    category:string
};

export type Address = {
    _id: string;
    street: string,
    city: string,
    zip: string,
    country: string
};

export type Order = {
    _id: string;
    items: Array<CartItem>,
    total: number,
    address: Address,
    createdAt: string
};

export type CartItem = {
    productId: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};