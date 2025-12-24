import { Router } from 'express'; // Uvoz Express rutera
import {
  makeOrder,
  userOrders
} from '../controllers/orderController.js'; // Uvoz metoda iz kontrolera
import { validate } from '../middlewares/validate.js';

const router: Router = Router() // Kreiramo instancu rutera

// Definišemo rute i povezujemo ih sa odgovarajućim metodama iz kontrolera

// Ruta za login
router.post('/', makeOrder)
// Ruta za register
router.post('/:userId', userOrders)

export default router // Izvoz rutera za upotrebu u glavnom fajlu aplikacije