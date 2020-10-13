import * as multer from 'multer';
import { Router } from 'express';
import OrphanagesController from '../controllers/OrphanagesController';
import OrphanageValidators from '../validators/OrphanageValidators';
import uploadConfig from '../config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanage/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanageValidators.store, OrphanagesController.store);

export default routes;