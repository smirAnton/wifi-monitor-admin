import { Router } from 'express';

import { EmailHandler } from '../handlers';

const router = Router();

router.get('/blocked', EmailHandler.getBlocked);

router.get('/unsubscribed', EmailHandler.getUnsubscribed);

router.delete('/blocked', EmailHandler.removeBlocked);

router.delete('/unsubscribed', EmailHandler.removeUnsubscribed);

export default router;
