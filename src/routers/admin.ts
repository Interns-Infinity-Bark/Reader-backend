import * as Router from 'koa-router';
import { admin, login, logout, modifyPassword } from '../controllers/admin';
import { requireAdmin } from '../controllers';
import { users, disableUser, enableUser, deleteUser } from '../controllers/user';
import { addBook } from '../controllers/book';
import { addChapter } from '../controllers/chapter';

export const router = new Router()
    .get('/', requireAdmin, admin)
    .post('/login', login)
    .get('/logout', requireAdmin, logout)
    .put('/password', requireAdmin, modifyPassword)
    .get('/users', requireAdmin, users)
    .put('/disableUser', requireAdmin, disableUser)
    .put('/enableUser', requireAdmin, enableUser)
    .delete('/deleteUser', requireAdmin, deleteUser)
    .post('/book', requireAdmin, addBook)
    .post('/chapter', requireAdmin, addChapter)
;
