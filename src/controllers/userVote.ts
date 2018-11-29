import User from '../models/User';
import { jsonResp } from '../utils/stringUtil';
import Vote from '../models/Vote';
import { Op } from 'sequelize';
import UserVote from '../models/UserVote';
import { isInt } from 'validator';

export const addUserVote = async (ctx: any) => {
    const user = await User.findOne({
        where: {
            id: ctx.session.user.id
        }
    });
    if (!user) {
        ctx.body = jsonResp('error', '用户不存在');
        return;
    }
    const {voteId, option} = ctx.request.body;
    if (!voteId) {
        ctx.body = jsonResp('error', 'voteId 不能为空');
        return;
    }
    const vote = await Vote.findOne({
        where: {
            id: voteId
        }
    });
    if (!vote) {
        ctx.body = jsonResp('error', '投票不存在');
        return;
    }
    if (await UserVote.findOne({
        where: {
            [Op.and]: {
                userId: ctx.session.user.id,
                voteId: voteId
            }
        }
    })) {
        ctx.body = jsonResp('error', '不能重复投票');
        return;
    }
    if (!option) {
        ctx.body = jsonResp('error', '投票选项不能为空');
        return;
    }
    // @ts-ignore
    if (!isInt(option) || parseInt(option) < 0 || parseInt(option) >= vote.content.options.length) {
        ctx.body = jsonResp('error', '投票选项格式错误');
        return;
    }
    const userVote = new UserVote({
        option: parseInt(option)
    });
    await userVote.save();
    await user.$add('userVotes', userVote);
    await vote.$add('userVotes', userVote);
    ctx.body = jsonResp('ok', '投票成功', {
        userVote: userVote
    });
};
