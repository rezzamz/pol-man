import { Router } from 'express';
import {
  getHalls,
  createHall,
  updateHall,
  deleteHall
} from '../controllers/hallController';

const router = Router();

router.get('/', getHalls);
router.post('/', createHall);
router.put('/:id', updateHall);
router.delete('/:id', deleteHall);

export default router;