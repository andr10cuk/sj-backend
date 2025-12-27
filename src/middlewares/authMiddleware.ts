import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../auth/jwtUtils.js"
import { APIErrorCommon } from "../types/Error.js";

const error: APIErrorCommon = {
  failed: true,
  code: "NOT_AUTHENTICATED"
}

// Middleware za autentifikaciju korisnika putem JWT tokena
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization; // Proveravamo da li postoji Authorization header

  if (!authHeader) {
    return res.status(401).json(error); // Ako nema tokena, vraćamo grešku
  }

  const token = authHeader.split(" ")[1]; // Token se nalazi iza "Bearer "

  try {
    const payload = verifyToken(token) as { user_id: string }; // Verifikujemo token i dobijamo korisnički ID
    req.userId = payload.user_id; // Dodajemo korisnički ID u zahtev
    next(); // Nastavljamo dalje
  } catch (err) {
    return res.status(401).json(error); // Token je nevažeći ili je istekao
  }
};