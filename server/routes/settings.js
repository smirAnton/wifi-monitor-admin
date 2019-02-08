import { Router } from 'express';

import { SettingsHandler } from '../handlers';

const router = Router();

router.get('/', SettingsHandler.fetchAll);

router.put('/:id', SettingsHandler.update);

export default router;
