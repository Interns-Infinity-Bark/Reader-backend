import * as Router from 'koa-router';
import { admin, login, logout, modifyNickname, modifyPassword } from '../controllers/admin';
import { requireAdmin } from '../controllers';
import { users, disableUser, enableUser, enableManager, disableManager } from '../controllers/user';
import { disableVote, enableVote } from '../controllers/vote';

export const router = new Router()
    .post('/login', login)
    .get('/logout', logout)
    .get('/', requireAdmin, admin)
    .put('/nickname', requireAdmin, modifyNickname)
    .put('/password', requireAdmin, modifyPassword)
    .get('/users', requireAdmin, users)
    .put('/disableUser', requireAdmin, disableUser)
    .put('/enableUser', requireAdmin, enableUser)
    .put('/disableManager', requireAdmin, disableManager)
    .put('/enableManager', requireAdmin, enableManager)
    .put('/disableVote', requireAdmin, disableVote)
    .put('/enableVote', requireAdmin, enableVote)
;
