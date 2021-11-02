import { Request, Response } from 'express';
import { ProductModel } from '../models/productModel';
import { Product } from '../types/productTypes';

const productModel = new ProductModel();

const showAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productModel.index();
        res.json(products);
    } catch (error) {
        res.status(400);
        const err = error as Error;
        res.json({ error: err.message });
    }
};

const showOneProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.productId);
        const product = await productModel.showById(id);
        res.json(product);
    } catch (error) {
        res.status(400);
        const err = error as Error;
        res.json({ error: err.message });
    }
};

const showCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await productModel.showCategories();
        res.json(categories);
    } catch (error) {
        res.status(400);
        const err = error as Error;
        res.json({ error: err.message });
    }
};

const showProductsByCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const cat = req.params.category;
        const products = await productModel.showByCategory(cat);
        res.json(products);
    } catch (error) {
        res.status(400);
        const err = error as Error;
        res.json({ error: err.message });
    }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const newProductData: Product = req.body;
        const newProduct = await productModel.create(newProductData);
        res.json(newProduct);
    } catch (error) {
        res.status(400);
        const err = error as Error;
        res.json({ error: err.message });
    }
};

const editProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.productId);
        const editProductData: Product = {
            id: id,
            title: req.body.title,
            description: req.body.description,
            price: parseFloat(req.body.price),
            category: req.body.category,
            image: req.body.image,
            stock: parseInt(req.body.stock),
        };
        const editedProduct = await productModel.edit(editProductData);
        res.json(editedProduct);
    } catch (error) {
        res.status(400);
        const err = error as Error;
        res.json({ error: err.message });
    }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.productId);
        const deletedProduct = await productModel.delete(id);
        res.json(deletedProduct);
    } catch (error) {
        res.status(400);
        const err = error as Error;
        res.json({ error: err.message });
    }
};

export {
    showAllProducts,
    showOneProduct,
    showCategories,
    showProductsByCategory,
    createProduct,
    editProduct,
    deleteProduct,
};
