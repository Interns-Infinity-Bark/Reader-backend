import { Dialect } from 'sequelize';

const dialect: Dialect = 'mysql';

export const config = {
    host: 'host',
    database: 'database',
    username: 'username',
    password: 'password',
    dialect
};
