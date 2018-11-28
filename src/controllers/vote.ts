import Vote from '../models/Vote';
import { Op } from 'sequelize';
import { isInt } from 'validator';
import { jsonResp, md5 } from '../utils/stringUtil';
import { now } from 'lodash';
import User from '../models/User';

export const addVote = async (ctx: any) => {
    const user = await User.findOne({
        where: {
            id: ctx.session.user.id
        }
    });
    if (!user) {
        ctx.body = jsonResp('error', '用户不存在');
        return;
    }
    const {title, content, isPrivate, password, anonymous, endAt} = ctx.request.body;
    if (!title) {
        ctx.body = jsonResp('error', '标题不能为空');
    } else if (!content) {
        ctx.body = jsonResp('error', '内容不能为空');
    } else if (!content.options) {
        ctx.body = jsonResp('error', '选项不能为空');
    } else if (isPrivate && !password) {
        ctx.body = jsonResp('error', '密码不能为空');
    } else if (!endAt) {
        ctx.body = jsonResp('error', '结束时间不能为空');
    } else {
        const vote = new Vote({
            title: title,
            content: content,
            private: isPrivate,
            password: md5(password),
            anonymous: anonymous,
            endAt: endAt
        });
        await vote.save();
        await user.$add('votes', vote);
        ctx.body = jsonResp('ok', '发布投票成功', {
            vote: vote
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

export const uvotes = async (ctx: any) => {
    const userId = ctx.params.id;
    const {title, page} = ctx.query;
    const user = await User.findOne({
        where: {
            id: userId
        }
    });
    if (!user) {
        ctx.body = jsonResp('error', '用户不存在');
        return;
    }
    let votes = await user.$get('votes');
    if (!Array.isArray(votes)) {
        votes = [votes];
    }
    if (title) {
        votes = votes.filter(vote => (vote.dataValues as Vote).title.includes(title));
    }
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

export const disableVote = async (ctx: any) => {
    const voteId = ctx.request.body.voteId;
    if (!voteId) {
        ctx.body = jsonResp('error', 'voteId 不能为空');
        return;
    }
    const vote = await Vote.findOne({
        where: {
            id: voteId
        }
    });
    if (vote) {
        if (vote.isActive === true) {
            vote.isActive = false;
            await vote.save();
            ctx.body = jsonResp('ok', '禁用投票成功');
        } else {
            ctx.body = jsonResp('error', '投票已被禁用');
        }
    } else {
        ctx.body = jsonResp('error', '投票不存在');
    }
};

export const enableVote = async (ctx: any) => {
    const voteId = ctx.request.body.voteId;
    if (!voteId) {
        ctx.body = jsonResp('error', 'voteId 不能为空');
        return;
    }
    const vote = await Vote.findOne({
        where: {
            id: voteId
        }
    });
    if (vote) {
        if (vote.isActive === false) {
            vote.isActive = true;
            await vote.save();
            ctx.body = jsonResp('ok', '启用投票成功');
        } else {
            ctx.body = jsonResp('error', '投票未被禁用');
        }
    } else {
        ctx.body = jsonResp('error', '投票不存在');
    }
};

export const vote = async (ctx: any) => {
    const vote = await Vote.findOne({
        where: {
            id: ctx.params.id
        }
    });
    if (vote) {
        if (vote.private) {
            if (!ctx.request.body.password) {
                ctx.body = jsonResp('error', '密码不能为空');
                return;
            } else if (vote.password !== md5(ctx.request.body.password)) {
                ctx.body = jsonResp('error', '密码错误');
                return;
            }
        }
        ctx.body = jsonResp('ok', 'success', {
            vote: vote
        });
    } else {
        ctx.body = jsonResp('error', '投票不存在');
    }
};
