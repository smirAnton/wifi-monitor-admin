import { Router } from 'express';

import { IconHandler } from '../handlers';

const router = Router();

router.get('/', IconHandler.fetchAll);

router.post('/keyword', IconHandler.addKeyword);

router.delete('/keyword/:id', IconHandler.removeKeyword);

export default router;
