import express from 'express';

import {
    getFoods,
    createFood,
    deleteFood,
    updateFood,
    loveFood,
} from '../controllers/foodController.js';

const router = express.Router();

router.post('/', createFood);
router.get('/', getFoods);
router.patch('/:id', updateFood);
router.delete('/:id', deleteFood);
router.patch('/:id/loveFood', loveFood);

export default router;
