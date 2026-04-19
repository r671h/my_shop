export type Product = {
    _id:string,
    title:string,
    price:number,
    image:string,
    description:string,
    category:string,
    reviews: Review[]
    rating?: {
        rate: number;
        count: number;
    }
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
    productId: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

export type Review = {
    _id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}
