import express from 'express';
import { body } from 'express-validator';
import { checkAdminToken, checkToken} from '../middleware/question.js';
import { getUsers, createUser, createAdmin, loginUser, deleteUser, logoutUser } from '../drivers/user.js';

const router = express.Router();

router.get('/all',checkAdminToken, getUsers);
router.get('/logout', checkToken, logoutUser);
router.post('/addUser', [
    body('email').isEmail(),
    body('name').isString().isLength({ min: 3, max: 255 }),
    body('password').isLength({ min: 8, max: 255 })
], createUser);

router.post('/addAdmin', [
    body('email').isEmail(),
    body('name').isString().isLength({ min: 3, max: 255 }),
    body('password').isLength({ min: 8, max: 255 })
], createAdmin);

router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 255 }),
],loginUser);

router.delete('/delete/:id', checkAdminToken, deleteUser);

export default router;