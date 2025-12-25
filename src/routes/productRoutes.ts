import { Router } from 'express'; // Uvoz Express rutera
import {
  createProduct,
  allProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js'; // Uvoz metoda iz kontrolera
import { validate } from '../middlewares/validate.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { productSchema } from '../schemas/productSchema.js';
import { badImage } from '../middlewares/badImageMiddleware.js';

const router: Router = Router() // Kreiramo instancu rutera

// Definišemo rute i povezujemo ih sa odgovarajućim metodama iz kontrolera

// Ruta za kreiranje proizvoda
router.post('/', authenticate, validate(productSchema), badImage, createProduct)
// Ruta za dohvatanje svih proizvoda
router.get('/', allProducts)
// Ruta za dohvatanje odredjenog proizvoda
router.get('/:productId', getProduct)
// Ruta za update odredjenog proizvoda
router.patch('/:productId', updateProduct)
// Ruta za brisanje odredjenog proizvoda
router.delete('/:productId', deleteProduct)

export default router // Izvoz rutera za upotrebu u glavnom fajlu aplikacije