import { Router } from 'express';

import { DnsDictionaryHandler } from '../../handlers';

const router = Router();

router.get('/', DnsDictionaryHandler.fetchAll);

router.get('/export', DnsDictionaryHandler.exportDNS);

router.get('/:id', DnsDictionaryHandler.fetchById);

router.post('/', DnsDictionaryHandler.create);

router.put('/:id', DnsDictionaryHandler.update);

router.delete('/:id', DnsDictionaryHandler.delete);

export default router;
