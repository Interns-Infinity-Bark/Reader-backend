import * as Router from 'koa-router';
import * as admin from './admin';
import { user, login, logout, modifyNickname, modifyPassword, register } from '../controllers/user';
import { requireLogin, requireManager } from '../controllers';
import { votes, ongoingVotes, endedVotes, uvotes, addVote } from '../controllers/vote';

export const routers = new Router()
    .use('/admin', admin.router.routes(), admin.router.allowedMethods())
    .get('/', requireLogin, user)
    .post('/register', register)
    .post('/login', login)
    .get('/logout', logout)
    .put('/nickname', requireLogin, modifyNickname)
    .put('/password', requireLogin, modifyPassword)
    .get('/user/:id', requireLogin, user)
    .get('/votes', requireLogin, votes)
    .get('/user/:id/votes', requireLogin, uvotes)
    .get('/ongoingVotes', requireLogin, ongoingVotes)
    .get('/endedVotes', requireLogin, endedVotes)
    .post('/vote', requireLogin, requireManager, addVote)
;
