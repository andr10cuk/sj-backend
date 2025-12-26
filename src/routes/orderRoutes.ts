import { Router } from 'express'; // Uvoz Express rutera
import {
  makeOrder,
  userOrders
} from '../controllers/orderController.js'; // Uvoz metoda iz kontrolera
import { validate } from '../middlewares/validate.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { orderSchema } from '../schemas/orderSchema.js';

const router: Router = Router() // Kreiramo instancu rutera

// Definišemo rute i povezujemo ih sa odgovarajućim metodama iz kontrolera

// Ruta za kreiranje porudzbine
router.post('/', authenticate, validate(orderSchema), makeOrder)
// Ruta za dohvatanje porudzbina nekog korisnika
router.get('/:userId', authenticate, userOrders)

export default router // Izvoz rutera za upotrebu u glavnom fajlu aplikacije