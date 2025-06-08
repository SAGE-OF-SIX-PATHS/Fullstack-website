import express from 'express';
import { getProducts, getProductById, createSampleProducts } from '../controllers/product.controller';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Development route for creating sample products
router.post('/sample', createSampleProducts);

export default router;