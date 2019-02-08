import { Router } from 'express';

import { SuperDictionaryHandler } from '../../handlers';

const router = Router();

router.get('/', SuperDictionaryHandler.fetchAll);

router.get('/export', SuperDictionaryHandler.exportSuper);

router.get('/:id', SuperDictionaryHandler.fetchById);

router.post('/', SuperDictionaryHandler.create);

router.put('/:id', SuperDictionaryHandler.update);

router.delete('/:id', SuperDictionaryHandler.delete);

export default router;
