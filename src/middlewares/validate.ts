import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { APIErrorCommon } from "../types/Error.js";

// Middleware za validaciju ulaznih podataka koristeći Zod šemu
export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // Validiramo telo zahteva prema šemi
      next(); // Nastavljamo dalje ako je validacija uspešna
    } catch (err) {
      const error: APIErrorCommon = {
        failed: true,
        code: "INVALID_DATA",
        extra: err.issues
      }
      return res.status(400).json(error); // Vraćamo grešku ako validacija nije uspela
    }
};