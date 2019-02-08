import { Router } from 'express';

import { AuthHandler } from '../handlers';

const router = Router();

router.post('/login', AuthHandler.login);

export default router;
