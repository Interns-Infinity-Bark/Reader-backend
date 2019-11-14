import * as Router from 'koa-router';
import { requireLogin, requireUser } from '../controllers';
import { book, books } from '../controllers/book';
import { chapter, chapters } from '../controllers/chapter';
import { addComment, comments, userComments } from '../controllers/comment';
import { login, logout, modifyPassword, register, user } from '../controllers/user';
import * as admin from './admin';

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
    .post('/comment', requireUser, addComment);
