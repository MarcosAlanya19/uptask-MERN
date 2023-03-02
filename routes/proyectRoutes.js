import { Router } from 'express';
import { addCollaborators, deleteCollaborator, deleteProyect, getProyect, getProyects, getTasks, newProyect, putProyect } from '../controllers/proyectController.js';
import { checkAuth } from '../middleware/checkAuth.js';

export const router = Router()

// Autenticacion, Registro y confirmacion de usuarios
router.route('/')
  .get(checkAuth, getProyects)
  .post(checkAuth, newProyect);

router.route('/:id')
  .get(checkAuth, getProyect)
  .put(checkAuth, putProyect)
  .delete(checkAuth, deleteProyect);

router.get('/tasks/:id', checkAuth, getTasks);
router.post('/add-collaborator/:id', checkAuth, addCollaborators);
router.post('/delete-collaborator/:id', checkAuth, deleteCollaborator);
