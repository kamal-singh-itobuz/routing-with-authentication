import express from 'express';
import  {getContacts, createContact, getContact, updateContact, deleteContact} from '../controllers/contactController.js';
import validateToken from '../middleware/validateTokenHandler.js';
const router = express.Router();

// router.route('/').get(getContacts);
// router.route('/').post(createContact);
// router.route('/:id').get(getContact);
// router.route('/:id').put(updateContact);
// router.route('/:id').delete(deleteContact);
//We can write above five routes like below---
router.use(validateToken); //Now all routes are private, only signed in user can access
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

export default router;