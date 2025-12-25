import { Request, Response, NextFunction } from "express"
import { APIErrorCommon } from "../types/Error.js";

// Middleware za autorizaciju korisnika
export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Dohvatamo ID iz URL-a
  const userIdFromToken = req.userId; // ID korisnika iz JWT tokena (postavlja authenticate middleware)

  console.log('id: ', id)
  console.log('token id: ', userIdFromToken)
  // Proveravamo da li korisnik pokušava da menja sopstvene podatke
  if (id !== userIdFromToken) {
    const error: APIErrorCommon = {
        failed: true,
        code: "NOT_YOURS",
    }
    
    return res
      .status(403)
      .json(error);
  }

  // Ako je autorizacija uspešna, nastavljamo dalje
  next();
};