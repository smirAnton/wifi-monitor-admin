import { Router } from 'express';

import { DeviceHandler } from '../handlers';

const router = Router();

router.get('/', DeviceHandler.fetchAll);

router.get('/ip', DeviceHandler.getInternalIP);

router.post('/', DeviceHandler.create);

router.put('/:id', DeviceHandler.update);

export default router;
