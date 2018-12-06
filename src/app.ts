import { config } from './config';
import { Sequelize } from 'sequelize-typescript';
import * as Koa from 'koa';
import * as path from 'path';
import { routers } from './routers';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session';
import * as cors from 'koa2-cors';

const app = new Koa();

const sequelize = new Sequelize({
    ...config,
    modelPaths: [path.join(__dirname, '/models')],
    operatorsAliases: false,
    timezone: '+08:00'
});

(async () => {
    await sequelize.sync({
        force: false
    });

    // const qaqrz = new Admin({
    //     username: 'QAQrz',
    //     password: md5('QAQrz'),
    //     nickname: 'QAQrz'
    // });
    // await qaqrz.save();
    //
    // const umr = new Admin({
    //     username: 'UMR',
    //     password: md5('UMR'),
    //     nickname: 'UMR'
    // });
    // await umr.save();
    //
    // const ninaye = new Admin({
    //     username: 'Ninaye',
    //     password: md5('Ninaye'),
    //     nickname: 'Ninaye'
    // });
    // await ninaye.save();
})();

app.keys = ['votee'];

app.use(cors({
    origin: 'http://123.206.15.249',
    allowHeaders: ['Content-Type'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser());

app.use(session(app));

app.use(routers.routes()).use(routers.allowedMethods());

app.use(ctx => {
    ctx.set('Content-Type', 'application/json');
});

app.listen(3000);
