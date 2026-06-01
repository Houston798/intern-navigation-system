import { Router } from 'express';
import { getTasks, getTask, create, update, remove } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
