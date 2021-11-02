type TopProducts = {
    id: number;
    title: string;
    category: string;
    times_sold: number;
};

type TopProductsByVolume = {
    id: number;
    title: string;
    category: string;
    volume: number;
};

export { TopProducts, TopProductsByVolume };
