import { config } from './config';
import { Sequelize } from 'sequelize-typescript';
import * as Koa from 'koa';
import * as path from 'path';
import { routers } from './routers';
import Admin from './models/Admin';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session';
import { md5 } from './utils/stringUtil';
import User from './models/User';

const app = new Koa();

const sequelize = new Sequelize({
    ...config,
    modelPaths: [path.join(__dirname, '/models')],
    operatorsAliases: false
});

// init
(async () => {
    await sequelize.sync({
        force: true
    });

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
})();

app.keys = ['votee'];

app.use(bodyParser());

app.use(session(app));

app.use(routers.routes()).use(routers.allowedMethods());

app.use(ctx => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Content-Type', 'application/json');
});

app.listen(3000);
