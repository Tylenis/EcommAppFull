import { Product } from '../types/productTypes';
import { client } from '../database';
import {
    formatProductData,
    formatCategories,
} from '../utilities/dataFormatters';

export class ProductModel {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            const final = result.rows.map(formatProductData);
            return final;
        } catch (error) {
            throw new Error(
                `Could not retrieve products from database. Error details: ${error}`
            );
        }
    }

    async showById(productid: number): Promise<Product | null> {
        try {
            const sql = 'SELECT * FROM products WHERE id=$1';
            const conn = await client.connect();
            const result = await conn.query(sql, [productid]);
            conn.release();
            if (result.rowCount > 0) {
                const final = formatProductData(result.rows[0]);
                return final;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(
                `Could not retrieve product id:${productid} from database. Error details: ${error}`
            );
        }
    }

    async showCategories(): Promise<string[]> {
        try {
            const sql = 'SELECT category FROM products GROUP BY category';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            if (result.rowCount > 0) {
                const final = result.rows.map(formatCategories);
                return final;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(
                `Could not retrieve categories from database. Error details: ${error}`
            );
        }
    }

    async showByCategory(category: string): Promise<Product[] | []> {
        try {
            const sql = 'SELECT * FROM products WHERE category=$1';
            const conn = await client.connect();
            const result = await conn.query(sql, [category]);
            conn.release();
            if (result.rowCount > 0) {
                const final = result.rows.map(formatProductData);
                return final;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(
                `Could not retrieve products category:${category} from database. Error details: ${error}`
            );
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (title, description, price, stock, image, category) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                p.title,
                p.description,
                p.price,
                p.stock,
                p.image,
                p.category,
            ]);
            conn.release();
            const final = formatProductData(result.rows[0]);
            return final;
        } catch (error) {
            throw new Error(
                `Could not create product ${p.title}. Error details: ${error}`
            );
        }
    }

    async edit(p: Product): Promise<Product> {
        try {
            const sql =
                'UPDATE products SET title=$1, description=$2, price=$3, stock=$4, image=$5, category=$6 WHERE id=$7 RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                p.title,
                p.description,
                p.price,
                p.stock,
                p.image,
                p.category,
                p.id,
            ]);
            conn.release();
            const final = formatProductData(result.rows[0]);
            return final;
        } catch (error) {
            throw new Error(
                `Could not edit product :${p.title}. Error details: ${error}`
            );
        }
    }

    async delete(
        productid: number
    ): Promise<{ success: boolean; msg: string }> {
        try {
            const sql = `DELETE FROM products WHERE id=$1`;
            const conn = await client.connect();
            const result = await conn.query(sql, [productid]);
            conn.release();
            if (result.rowCount > 0) {
                return {
                    success: true,
                    msg: `Product id:${productid} was deleted successfully.`,
                };
            } else {
                return {
                    success: false,
                    msg: `Product id:${productid} does not exist.`,
                };
            }
        } catch (error) {
            throw new Error(
                `Could not delete product id:${productid}. Error details: ${error}`
            );
        }
    }
}
