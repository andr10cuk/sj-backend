import { z } from "zod";

export const orderSchema = z.object({
    value: z.number().positive('Value must be positive'),
    quantity: z.number().positive('Quantity must be positive'),
    user_id: z.string(),
    product_id: z.string()
})