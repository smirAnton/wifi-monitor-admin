import { Router } from 'express';

import { SnapshotsHandler } from '../handlers';

const router = Router();

router.get('/', SnapshotsHandler.fetchAll);

router.post('/', SnapshotsHandler.create);

router.put('/:id', SnapshotsHandler.update);

router.patch('/:id', SnapshotsHandler.changeStatus);

router.get('/:id/exports', SnapshotsHandler.exportXLS);

router.get('/:id/restore', SnapshotsHandler.restore);

export default router;
