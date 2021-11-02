CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password text NOT NULL);
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description text NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock integer,
    image VARCHAR(150) NOT NULL,
    category VARCHAR(150) NOT NULL
);
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL
);
CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id bigint REFERENCES orders(id) ON DELETE CASCADE,
    product_id bigint REFERENCES products(id),
    quantity integer NOT NULL
)
