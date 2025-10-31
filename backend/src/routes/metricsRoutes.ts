import { Router } from 'express';
import metricsController from '../controllers/metricsController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/dashboard', metricsController.getDashboard);
router.get('/regions', metricsController.getRegions);
router.get('/products', metricsController.getProducts);

export default router;