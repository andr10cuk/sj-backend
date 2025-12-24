import { Request, Response } from 'express'; // Uvoz tipova za zahteve i odgovore
import { AppDataSource } from '../data-source.js';
import { User } from '../entities/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../auth/jwtUtils.js';

// User register
export const registerUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User)
  const { username, password } = req.body

  const user = await userRepository.findOneBy({
    username
  })
  if(user) {
    return res.status(401).json({ error: "DUPLICATE_USERNAME" });
  }

  // Hesiramo lozinku pre nego što je sačuvamo u bazi
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    username,
    password: hashedPassword
  })
  const savedUser = await userRepository.save(newUser);

  res.json({
    failed: false,
    user_id: savedUser.id
  })
}

// User login
export const loginUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User)
  const { username, password } = req.body

  const user = await userRepository.findOneBy({
    username
  })
  if(!user) {
    return res.status(401).json({ error: "INCORRECT_CREDENTIALS" });
  }

  // Upoređujemo unesenu lozinku sa hesiranom lozinkom u bazi
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "INCORRECT_CREDENTIALS" });
  }

  const token = generateToken(user.id)
  res.json({
    failed: false,
    token: token
  })
}
