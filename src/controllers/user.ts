import User from '../models/User';
import { jsonResp, md5 } from '../utils/stringUtil';
import { isEmail, isInt } from 'validator';
import Vote from '../models/Vote';
import { now } from 'lodash';
import { Op } from 'sequelize';

export const register = async (ctx: any) => {
    if (ctx.session.user) {
        ctx.body = jsonResp('error', '已登录');
        return;
    }
    const {email, password, confirmPassword, nickname} = ctx.request.body;
    if (!email) {
        ctx.body = jsonResp('error', 'Email 不能为空');
    } else if (!isEmail(email)) {
        ctx.body = jsonResp('error', 'Email 格式错误');
    } else if (await User.findOne({
        where: {
            email: email
        }
    })) {
        ctx.body = jsonResp('error', 'Email 已存在');
    } else if (!password) {
        ctx.body = jsonResp('error', '密码不能为空');
    } else if (password !== confirmPassword) {
        ctx.body = jsonResp('error', '两次输入的密码不一致');
    } else if (!nickname) {
        ctx.body = jsonResp('error', '昵称不能为空');
    } else if (await User.findOne({
        where: {
            nickname: nickname
        }
    })) {
        ctx.body = jsonResp('error', '昵称已存在');
    } else {
        const user = new User({
            email: email,
            password: md5(password),
            nickname: nickname
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
    const {email, password} = ctx.request.body;
    if (!email) {
        ctx.body = jsonResp('error', 'Email 不能为空');
    } else if (!isEmail(email)) {
        ctx.body = jsonResp('error', 'Email 格式错误');
    } else if (!password) {
        ctx.body = jsonResp('error', '密码不能为空');
    } else {
        const user = await User.findOne({
            where: {
                email: email
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
            ctx.body = jsonResp('error', 'Email 不存在');
        }
    }
};

export const logout = async (ctx: any) => {
    delete ctx.session.user;
    ctx.body = jsonResp('ok', '登出成功');
};

export const modifyNickname = async (ctx: any) => {
    const nickname = ctx.request.body.nickname;
    if (!nickname) {
        ctx.body = jsonResp('error', '昵称不能为空');
    } else if (nickname === ctx.session.user.nickname) {
        ctx.body = jsonResp('error', '昵称未改动');
    } else if (await User.findOne({
        where: {
            nickname: nickname
        }
    })) {
        ctx.body = jsonResp('error', '昵称已存在');
    } else {
        const user = await User.findOne({
            where: {
                id: ctx.session.user.id
            }
        });
        user.nickname = nickname;
        await user.save();
        ctx.session.user = user;
        ctx.body = jsonResp('ok', '昵称修改成功', {
            user: user
        });
    }
};

export const modifyPassword = async (ctx: any) => {
    const {oldPassword, password, confirmPassword} = ctx.request.body;
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

export const votes = async (ctx: any) => {
    const {title, page} = ctx.query;
    let votes = title ? await Vote.findAll({
        where: {
            title: {
                [Op.like]: '%' + title + '%'
            }
        }
    }) : await Vote.findAll();
    if (page && isInt(page) && parseInt(page) > 0) {
        votes = votes.slice((parseInt(page) - 1) * 10, parseInt(page) * 10 - 1);
    }
    ctx.body = jsonResp('ok', 'success', {
        votes: votes
    });
};

export const ongoingVotes = async (ctx: any) => {
    const {title, page} = ctx.query;
    let votes = title ? await Vote.findAll({
        where: {
            title: {
                [Op.like]: '%' + title + '%'
            },
            endAt: {
                [Op.gt]: now()
            }
        }
    }) : await Vote.findAll({
        where: {
            endAt: {
                [Op.gt]: now()
            }
        }
    });
    if (page && isInt(page) && parseInt(page) > 0) {
        votes = votes.slice((parseInt(page) - 1) * 10, parseInt(page) * 10 - 1);
    }
    ctx.body = jsonResp('ok', 'success', {
        votes: votes
    });
};

export const endedVotes = async (ctx: any) => {
    const {title, page} = ctx.query;
    let votes = title ? await Vote.findAll({
        where: {
            title: {
                [Op.like]: '%' + title + '%'
            },
            endAt: {
                [Op.lte]: now()
            }
        }
    }) : await Vote.findAll({
        where: {
            endAt: {
                [Op.lte]: now()
            }
        }
    });
    if (page && isInt(page) && parseInt(page) > 0) {
        votes = votes.slice((parseInt(page) - 1) * 10, parseInt(page) * 10 - 1);
    }
    ctx.body = jsonResp('ok', 'success', {
        votes: votes
    });
};
