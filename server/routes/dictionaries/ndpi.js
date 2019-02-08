import { Router } from 'express';

import { NdpiDictionaryHandler } from '../../handlers';

const router = Router();

router.get('/', NdpiDictionaryHandler.fetchAll);

router.get('/export', NdpiDictionaryHandler.exportNDPI);

router.get('/:id', NdpiDictionaryHandler.fetchById);

router.post('/', NdpiDictionaryHandler.create);

router.put('/:id', NdpiDictionaryHandler.update);

router.delete('/:id', NdpiDictionaryHandler.delete);

export default router;
