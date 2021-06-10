import { Router } from 'express';

import SearchController from '../controllers/search.controller';

const router = Router();

const controller = new SearchController();

router.get('/products', controller.searchProduct);
router.get('/categories', controller.getCategories);

export default router;
