import { z } from "zod";

// Šema za registraciju/login korisnika
export const authSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 6 characters long")
    .max(128, "Password must be at most 128 characters long"),
});
