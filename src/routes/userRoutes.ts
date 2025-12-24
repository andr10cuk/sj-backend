import { Router } from 'express'; // Uvoz Express rutera
import {
  loginUser,
  registerUser
} from '../controllers/userController.js'; // Uvoz metoda iz kontrolera
import { validate } from '../middlewares/validate.js';
import { authSchema } from '../schemas/authSchema.js';

const router: Router = Router() // Kreiramo instancu rutera

// Definišemo rute i povezujemo ih sa odgovarajućim metodama iz kontrolera

// Ruta za login
router.post('/login', validate(authSchema), loginUser)
// Ruta za register
router.post('/register', validate(authSchema), registerUser)

export default router // Izvoz rutera za upotrebu u glavnom fajlu aplikacije
