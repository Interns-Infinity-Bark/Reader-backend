import { config } from './config';
import { Sequelize } from 'sequelize-typescript';
import User from './models/User';
import Koa from 'koa';

const app = new Koa();

const sequelize = new Sequelize({
    ...config,
    modelPaths: [__dirname + '/models']
});

// Test
(async () => {
    await sequelize.sync({
        force: true
    });

    const user = new User({
        email: 'qaqrz@qq.com',
        password: 'QAQrz',
        nickname: 'QAQrz'
    });
    await user.save();

    const users = await User.findAll();
    console.log(users[0].nickname);
})();


app.use(context => {
    context.body = 'Hello World!';
});

app.listen(3000);
