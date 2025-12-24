import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../auth/jwtUtils.js"

// Middleware za autentifikaciju korisnika putem JWT tokena
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization; // Proveravamo da li postoji Authorization header

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" }); // Ako nema tokena, vraćamo grešku
  }

  const token = authHeader.split(" ")[1]; // Token se nalazi iza "Bearer "

  try {
    const payload = verifyToken(token) as { userId: number }; // Verifikujemo token i dobijamo korisnički ID
    req.userId = payload.userId; // Dodajemo korisnički ID u zahtev
    next(); // Nastavljamo dalje
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" }); // Token je nevažeći ili je istekao
  }
};