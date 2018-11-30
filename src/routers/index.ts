import * as Router from 'koa-router';
import * as admin from './admin';
import { user, login, logout, modifyNickname, modifyPassword, register } from '../controllers/user';
import { requireLogin, requireManager, requireUser } from '../controllers';
import {
    votes, ongoingVotes, endedVotes, uvotes, addVote, vote, deleteVote, modifyVote, myVotes, result
} from '../controllers/vote';
import { addUserVote } from '../controllers/userVote';

export const routers = new Router()
    .use('/admin', admin.router.routes(), admin.router.allowedMethods())
    .get('/', requireUser, user)
    .post('/register', register)
    .post('/login', login)
    .get('/logout', requireUser, logout)
    .put('/nickname', requireUser, modifyNickname)
    .put('/password', requireUser, modifyPassword)
    .get('/user/:id', requireLogin, user)
    .get('/votes', requireLogin, votes)
    .get('/user/:id/votes', requireLogin, uvotes)
    .get('/ongoingVotes', requireLogin, ongoingVotes)
    .get('/endedVotes', requireLogin, endedVotes)
    .get('/vote/:id', requireLogin, vote)
    .get('/result/:id', requireLogin, result)
    .get('/myVotes', requireUser, myVotes)
    .put('/vote/:id', requireUser, requireManager, modifyVote)
    .delete('/vote/:id', requireLogin, deleteVote)
    .post('/vote/:id', requireLogin, vote)
    .post('/vote', requireUser, requireManager, addVote)
    .post('/userVote', requireUser, addUserVote)
;
