import jwt from "jsonwebtoken";

// Ključ za potpisivanje i verifikaciju JWT tokena
const JWT_SECRET = process.env.JWT_SECRET || "supertajnakljuc";

// Funkcija za generisanje JWT tokena
export const generateToken = (user_id: string, username: string) => {
  return jwt.sign({ user_id, username }, JWT_SECRET);
};

// Funkcija za verifikaciju JWT tokena
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET); // Proverava validnost i dekodira token
};