import { Request, Response } from 'express'; // Uvoz tipova za zahteve i odgovore
import { AppDataSource } from '../data-source.js';
import { User } from '../entities/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../auth/jwtUtils.js';
import { APIErrorCommon } from '../types/Error.js';
import { LoginRes, UserCreationRes } from '../types/Responses.js';

// User register
export const registerUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User)
  const { username, password } = req.body

  const user = await userRepository.findOneBy({
    username
  })
  if(user) {
    const error: APIErrorCommon = {
      failed: true,
      code: "DUPLICATE_USERNAME"
    }
    return res.status(401).json(error);
  }

  // Hesiramo lozinku pre nego što je sačuvamo u bazi
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    username,
    password: hashedPassword
  })
  const savedUser = await userRepository.save(newUser);

  const responseAPI: UserCreationRes = {
    failed: false,
    user_id: savedUser.id
  }
  res.status(201).json(responseAPI)
}

// User login
export const loginUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User)
  const { username, password } = req.body

  const user = await userRepository.findOneBy({
    username
  })
  if(!user) {
    const error: APIErrorCommon = {
      failed: true,
      code: "INCORRECT_CREDENTIALS"
    }
    return res.status(401).json(error);
  }

  // Upoređujemo unesenu lozinku sa hesiranom lozinkom u bazi
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error: APIErrorCommon = {
      failed: true,
      code: "INCORRECT_CREDENTIALS"
    }

    return res.status(401).json(error);
  }

  const token = generateToken(user.id)
  const responseAPI: LoginRes = {
    failed: false,
    token: token
  }

  res.status(200).json(responseAPI)
}
