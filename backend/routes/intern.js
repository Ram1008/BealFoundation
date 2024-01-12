import express from 'express';
import { body } from 'express-validator';
import { checkAdminToken, checkToken} from '../middleware/question.js';
import {getAllInterns, addIntern, deleteIntern, getIntern, getCertificate, updateIntern} from '../drivers/intern.js';

const router = express.Router();


router.get('/all',checkAdminToken, getAllInterns);
router.post('/add',checkToken, [
    body('name').isLength({ min: 3 }),
    body('email').isEmail()
], addIntern);
router.delete('/delete/:id', checkAdminToken, deleteIntern);
router.put('/edit/:id', checkAdminToken, updateIntern);

router.post('/getDetails',checkToken,getIntern );

router.post('/getCertificate',checkToken, getCertificate);


export default router;
