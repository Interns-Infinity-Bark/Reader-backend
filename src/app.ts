import { config } from './config';
import { Sequelize } from 'sequelize-typescript';
import User from './models/User';

const sequelize = new Sequelize({
    ...config,
    modelPaths: [__dirname + '/models']
});

(async () => {
    await User.sync({
        force: true
    });
    const user = new User({
        email: 'test@111.com',
        nickname: 'QAQrz'
    });
    await user.save();
    const users = await User.findAll({
        order: [['id', 'DESC'], ['email', 'DESC']]
    });
    console.log(users);
})();
