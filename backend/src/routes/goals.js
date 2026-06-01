import { Router } from 'express';
import { getGoals, getGoal, create, update, remove } from '../controllers/goalController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getGoals);
router.get('/:id', getGoal);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
