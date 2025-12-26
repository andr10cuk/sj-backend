import { OrderDto, ProductDto } from "./EntityDTOs.js";

/* AUTH RESPONSES */
// Login Response
export type LoginRes = {
    failed: false;
    token: string;
}

// Register Response
export type UserCreationRes = {
    failed: false;
    user_id: string;
}


/* PRODUCT RESPONSES */
// Create product Response
export type NewProductRes = {
    failed: false;
    product_id: string;
}

// Get all products Response
export interface ProductListingPage {
    products: ProductDto[];
    total: number;
}

// Get specific product Response
export type GetProductRes = {
    failed: false;
    product: ProductDto;
}

// Update product Response
export type UpdateProductRes = {
    failed: false;
}

// Delete product Response
export type DeleteProductRes = {
    failed: false;
}

/* ORDER RESPONSES */
// Create order Response
export type NewOrderRes = {
    failed: false;
    order: {
        order_id: string;
        product_title: string;
        product_value: number;
        product_quantity: number;
        created_at: string;
    }
}

// Get user orders
export interface OrdersListingPage {
    orders: OrderDto[];
    total: number;
}