import { Request, Response } from 'express';
import { OrderProductsModel } from '../models/orderProductsModel';

const orderProductsModel = new OrderProductsModel();

const topProductsByOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const qty = parseInt(req.params.qty);
        const products = await orderProductsModel.ShowTopProducts(qty);
        res.json(products);
    } catch (error) {
        res.status(400);
        const err = error as Error;
        res.json({ error: err.message });
    }
};

const topProductsByOrdersVolume = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const qty = parseInt(req.params.qty);
        const products = await orderProductsModel.ShowTopProductByVolume(qty);
        res.json(products);
    } catch (error) {
        res.status(400);
        const err = error as Error;
        res.json({ error: err.message });
    }
};

export { topProductsByOrders, topProductsByOrdersVolume };
