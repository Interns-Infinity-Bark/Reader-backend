import * as Router from 'koa-router';
import { admin, login, logout, modifyNickname, modifyPassword, userlist } from '../controllers/admin';
import { requireAdmin } from '../controllers';

export const router = new Router()
    .post('/login', login)
    .get('/logout', logout)
    .get('/', requireAdmin, admin)
    .put('/nickname', requireAdmin, modifyNickname)
    .put('/password', requireAdmin, modifyPassword)
    .get('/userlist', requireAdmin, userlist);
