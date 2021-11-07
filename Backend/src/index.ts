import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/userRouter';
import productRouter from './routes/productRouter';
import orderRouter from './routes/orderRouter';

const app = express();

if (process.env.ENV !== 'production') {
    dotenv.config();
}

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res): void => {
    res.json('Storefront API');
});

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

export default app;
