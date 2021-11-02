export interface Item {
    id: number;
    title: string;
    price: string;
    description: string;
    image: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}
