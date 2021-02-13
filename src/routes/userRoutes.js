import express from 'express';
import { users, user, repos } from '../controllers/userController.js';

const router = express.Router();

router.route('/all').get(users);

router.route('/one/:user').get(user);

router.route('/repos/:user').get(repos);

export default router;
