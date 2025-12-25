// Product
export type BaseProductDto = {
    title: string;
    description?: string;
    price: number;
    quantity: number;
    image_url: string;
}

export type ProductDto = BaseProductDto & {
    product_id: string;
    creator: {
        user_id: string;
        username: string;
    };
    created_at: string;
    updated_at: string;
};

// Order
export type BaseOrderDto = {
    value: number;
    quantity: number;
    user_id: string;
    product_id: string;
}

export type OrderDto = BaseOrderDto & {
    order_id: string;
    created_at: string;
    updated_at: string;
};