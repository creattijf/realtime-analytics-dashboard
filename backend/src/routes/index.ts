import { Router } from 'express';
import authRoutes from './authRoutes';
import metricsRoutes from './metricsRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/metrics', metricsRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;