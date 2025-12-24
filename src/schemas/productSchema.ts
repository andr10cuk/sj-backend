import { z } from "zod";

export const productSchema = z.object({
    title: z.string().min(1, 'Title is required').max(40, 'Title maximum size is 40'),
    description: z.string().max(200, 'Description maximum size is 200').optional(),
    price: z.number().positive(),
    quantity: z.number().positive(),
    image_url: z.string()
})