import express from 'express';
import { checkAdminToken} from '../middleware/question.js';
import { getAllDomains, addDomain, deleteDomain} from '../drivers/admin.js';
const router = express.Router();


router.get('/fetchalldomains', getAllDomains);
router.post('/adddomain',checkAdminToken, addDomain);
router.delete('/deleteDomain/:id',checkAdminToken, deleteDomain);


export default router;
