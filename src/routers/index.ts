import * as Router from 'koa-router';
import * as admin from './admin';
import { user, login, logout, modifyPassword, register } from '../controllers/user';
import { requireLogin, requireUser } from '../controllers';
import { books, book } from '../controllers/book';
import { addComment, comments, userComments } from '../controllers/comment';
import { chapter, chapters } from '../controllers/chapter';

export const routers = new Router()
    .use('/admin', admin.router.routes(), admin.router.allowedMethods())
    .get('/', requireUser, user)
    .post('/register', register)
    .post('/login', login)
    .get('/logout', requireUser, logout)
    .put('/password', requireUser, modifyPassword)
    .get('/user/:id', requireLogin, user)
    .get('/books', books)
    .get('/book/:id', book)
    .get('/book/:id/chapters', chapters)
    .get('/chapter/:id', chapter)
    .get('/chapter/:id/comments', comments)
    .get('/user/:id/comments', requireUser, userComments)
    .post('/comment', requireUser, addComment)
;
