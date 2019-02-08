import { Router } from 'express';

import { CategoryHandler } from '../../handlers';

const router = Router();

router.get('/', CategoryHandler.fetchAll);

router.get('/export', CategoryHandler.exportCategories);

router.get('/:id', CategoryHandler.fetchById);

router.post('/', CategoryHandler.create);

router.put('/:id', CategoryHandler.update);

router.delete('/:id', CategoryHandler.delete);

export default router;
