import * as Router from 'koa-router';
import { requireAdmin } from '../controllers';
import { admin, login, logout, modifyPassword } from '../controllers/admin';
import { addBook } from '../controllers/book';
import { addChapter } from '../controllers/chapter';
import { deleteUser, disableUser, enableUser, users } from '../controllers/user';

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
    .post('/chapter', requireAdmin, addChapter);
