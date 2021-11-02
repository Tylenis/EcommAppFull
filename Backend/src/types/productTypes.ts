type Product = {
    id?: number;
    title: string;
    description: string;
    price: number;
    stock?: number;
    category: string;
    quantity?: number;
    image: string;
};

type RawProductData = {
    id: number;
    title: string;
    description: string;
    price: string;
    stock: number;
    category: string;
    image: string;
};

export { Product, RawProductData };
