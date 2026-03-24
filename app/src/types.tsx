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