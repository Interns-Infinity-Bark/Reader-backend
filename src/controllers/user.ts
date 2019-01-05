import User from '../models/User';
import { jsonResp, md5 } from '../utils/stringUtil';
import { isInt } from 'validator';
import { Op } from 'sequelize';

export const register = async (ctx: any) => {
    if (ctx.session.user) {
        ctx.body = jsonResp('error', '已登录');
        return;
    }
    const { username, password, confirmPassword } = ctx.request.body;
    if (!username) {
        ctx.body = jsonResp('error', '用户名不能为空');
    } else if (await User.findOne({
        where: {
            username: username
        }
    })) {
        ctx.body = jsonResp('error', '用户已存在');
    } else if (!password) {
        ctx.body = jsonResp('error', '密码不能为空');
    } else if (password !== confirmPassword) {
        ctx.body = jsonResp('error', '两次输入的密码不一致');
    } else {
        const user = new User({
            username: username,
            password: md5(password)
        });
        await user.save();
        ctx.session.user = user;
        ctx.body = jsonResp('ok', '注册成功', {
            user: user
        });
    }
};

export const login = async (ctx: any) => {
    if (ctx.session.user) {
        ctx.body = jsonResp('error', '已登录');
        return;
    }
    const { username, password } = ctx.request.body;
    if (!username) {
        ctx.body = jsonResp('error', '用户名不能为空');
    } else if (!password) {
        ctx.body = jsonResp('error', '密码不能为空');
    } else {
        const user = await User.findOne({
            where: {
                username: username,
                isActive: true
            }
        });
        if (user) {
            if (user.password === md5(password)) {
                ctx.session.user = user;
                ctx.body = jsonResp('ok', '登录成功', {
                    user: user
                });
            } else {
                ctx.body = jsonResp('error', '密码错误');
            }
        } else {
            ctx.body = jsonResp('error', '用户不存在');
        }
    }
};

export const logout = async (ctx: any) => {
    delete ctx.session.user;
    ctx.body = jsonResp('ok', '登出成功');
};

export const modifyPassword = async (ctx: any) => {
    const { oldPassword, password, confirmPassword } = ctx.request.body;
    const user = await User.findOne({
        where: {
            id: ctx.session.user.id
        }
    });
    if (!oldPassword) {
        ctx.body = jsonResp('error', '原密码不能为空');
    } else if (!password) {
        ctx.body = jsonResp('error', '新密码不能为空');
    } else if (password !== confirmPassword) {
        ctx.body = jsonResp('error', '两次输入的密码不一致');
    } else if (user.password !== md5(oldPassword)) {
        ctx.body = jsonResp('error', '原密码错误');
    } else {
        user.password = md5(password);
        await user.save();
        delete ctx.session.user;
        ctx.body = jsonResp('ok', '密码修改成功, 请重新登录');
    }
};

export const user = async (ctx: any) => {
    if (ctx.params.id) {
        const user = await User.findOne({
            where: {
                id: ctx.params.id
            }
        });
        if (user) {
            ctx.body = jsonResp('ok', 'success', {
                user: user
            });
        } else {
            ctx.body = jsonResp('error', '用户不存在');
        }
    } else {
        ctx.body = jsonResp('ok', 'success', {
            user: ctx.session.user
        });
    }
};

export const users = async (ctx: any) => {
    const { username, page } = ctx.query;
    let users = username ? await User.findAll({
        where: {
            username: {
                [Op.like]: '%' + username + '%'
            }
        }
    }) : await User.findAll();
    if (page && isInt(page) && parseInt(page) > 0) {
        users = users.slice((parseInt(page) - 1) * 10, parseInt(page) * 10 - 1);
    }
    ctx.body = jsonResp('ok', 'success', {
        users: users
    });
};

export const disableUser = async (ctx: any) => {
    const userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = jsonResp('error', 'userId 不能为空');
        return;
    }
    const user = await User.findOne({
        where: {
            id: userId
        }
    });
    if (user) {
        if (user.isActive === true) {
            user.isActive = false;
            await user.save();
            ctx.body = jsonResp('ok', '禁用用户成功');
        } else {
            ctx.body = jsonResp('error', '用户已被禁用');
        }
    } else {
        ctx.body = jsonResp('error', '用户不存在');
    }
};

export const enableUser = async (ctx: any) => {
    const userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = jsonResp('error', 'userId 不能为空');
        return;
    }
    const user = await User.findOne({
        where: {
            id: userId
        }
    });
    if (user) {
        if (user.isActive === false) {
            user.isActive = true;
            await user.save();
            ctx.body = jsonResp('ok', '启用用户成功');
        } else {
            ctx.body = jsonResp('error', '用户未被禁用');
        }
    } else {
        ctx.body = jsonResp('error', '用户不存在');
    }
};

export const deleteUser = async (ctx: any) => {
    const userId = ctx.request.body.userId;
    if (!userId) {
        ctx.body = jsonResp('error', 'userId 不能为空');
        return;
    }
    const user = await User.findOne({
        where: {
            id: userId
        }
    });
    if (user) {
        await user.destroy();
        ctx.body = jsonResp('ok', '删除用户成功');
    } else {
        ctx.body = jsonResp('error', '用户不存在');
    }
};
