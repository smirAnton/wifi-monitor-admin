import { Router } from 'express';

import { VersionHandler } from '../handlers';

const router = Router();

router.get('/', VersionHandler.fetchAll);

router.post('/', VersionHandler.create);

export default router;
