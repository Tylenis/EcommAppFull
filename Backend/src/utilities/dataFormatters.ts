import { RawOrderDetailData, OrderDetail } from '../types/orderTypes';
import { Product, RawProductData } from '../types/productTypes';

const formatOrderData = (data: RawOrderDetailData[]): OrderDetail[] => {
    const ordersIds: number[] = [];
    const result: OrderDetail[] = [];
    data.forEach((row) => {
        if (!ordersIds.includes(row.order_id)) {
            ordersIds.push(row.order_id);
            result.push({
                id: parseInt(row.order_id as unknown as string),
                userId: parseInt(row.user_id as unknown as string),
                status: row.status,
                products: [],
            });
        }
        result.forEach((record, index) => {
            if (record.id == row.order_id) {
                result[index].products.push({
                    id: parseInt(row.product_id as unknown as string),
                    title: row.title,
                    description: row.description,
                    price: parseFloat(row.price as unknown as string),
                    quantity: parseInt(row.quantity as unknown as string),
                    category: row.category,
                    image: row.image,
                });
            }
        });
    });
    return result;
};

const formatProductData = (pdata: RawProductData): Product => {
    return {
        id: pdata.id,
        title: pdata.title,
        description: pdata.description,
        price: parseFloat(pdata.price),
        stock: pdata.stock,
        category: pdata.category,
        image: pdata.image,
    };
};

const formatCategories = (data: { category: string }): string => {
    return data.category;
};

export { formatOrderData, formatProductData, formatCategories };
