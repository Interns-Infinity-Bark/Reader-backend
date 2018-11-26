import { config } from './config';
import { Sequelize } from 'sequelize-typescript';
import * as Koa from 'koa';
import * as path from 'path';
import { routers } from './routers';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session';
import * as cors from 'koa2-cors';
import Admin from './models/Admin';
import { md5 } from './utils/stringUtil';
import User from './models/User';
import Vote from './models/Vote';
import { now } from 'lodash';

const app = new Koa();

const sequelize = new Sequelize({
    ...config,
    modelPaths: [path.join(__dirname, '/models')],
    operatorsAliases: false,
    timezone: '+08:00'
});

(async () => {
    await sequelize.sync({
        force: true
    });

    // todo
    const qaqrz = new Admin({
        username: 'QAQrz',
        password: md5('QAQrz'),
        nickname: 'QAQrz'
    });
    await qaqrz.save();

    const umr = new Admin({
        username: 'UMR',
        password: md5('UMR'),
        nickname: 'UMR'
    });
    await umr.save();

    const ninaye = new Admin({
        username: 'Ninaye',
        password: md5('Ninaye'),
        nickname: 'Ninaye'
    });
    await ninaye.save();

    const ninaye1 = new User({
        email: '1@q.com',
        password: md5('Ninaye'),
        nickname: 'Ninaye1'
    });
    await ninaye1.save();
    const ninaye2 = new User({
        email: '2@q.com',
        password: md5('Ninaye'),
        nickname: 'Ninaye2'
    });
    await ninaye2.save();
    const ninaye3 = new User({
        email: '3@q.com',
        password: md5('Ninaye'),
        nickname: 'Ninaye3'
    });
    await ninaye3.save();

    const option = {
        option: 'test'
    };
    const vote1 = new Vote({
        title: 'vote1',
        content: option,
        endAt: Date.parse('2019-01-01 00:00:00')
    });
    await vote1.save();
    await ninaye1.$add('votes', vote1);
    const vote2 = new Vote({
        title: 'vote2',
        content: option,
        endAt: Date.parse('2018-01-01 00:00:00')
    });
    await vote2.save();
    await ninaye2.$add('votes', vote2);
    const vote3 = new Vote({
        title: 'vote3',
        content: option,
        endAt: now()
    });
    await vote3.save();
    await ninaye3.$add('votes', vote3);
})();

app.keys = ['votee'];

app.use(cors({
    origin: '*',
    allowHeaders: ['Content-Type'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser());

app.use(session(app));

app.use(routers.routes()).use(routers.allowedMethods());

app.use(ctx => {
    ctx.set('Content-Type', 'application/json');
});

app.listen(3000);
