import User from '../models/User';
import { jsonResp } from '../utils/stringUtil';
import Chapter from '../models/Chapter';
import Comment from '../models/Comment';
import { isInt } from 'validator';

export const addComment = async (ctx: any) => {
    const user = await User.findOne({
        where: {
            id: ctx.session.user.id
        }
    });
    const { chapterId, content } = ctx.request.body;
    if (!chapterId) {
        ctx.body = jsonResp('error', 'chapterId 不能为空');
        return;
    }
    const chapter = await Chapter.findOne({
        where: {
            id: chapterId
        }
    });
    if (!chapter) {
        ctx.body = jsonResp('error', '章节不存在');
        return;
    }
    if (!content) {
        ctx.body = jsonResp('error', '评论内容不能为空');
        return;
    }
    const comment = new Comment({
        content: content
    });
    await comment.save();
    await user.$add('comments', comment);
    await chapter.$add('comments', comment);
    ctx.body = jsonResp('ok', '评论成功');
};

export const comments = async (ctx: any) => {
    const chapterId = ctx.params.id;
    const page = ctx.query.page;
    const chapter = await Chapter.findOne({
        where: {
            id: chapterId
        }
    });
    if (!chapter) {
        ctx.body = jsonResp('error', '章节不存在');
        return;
    }
    let comments = await chapter.$get('comments');
    if (!Array.isArray(comments)) {
        comments = [comments];
    }
    if (page && isInt(page) && parseInt(page) > 0) {
        comments = comments.slice((parseInt(page) - 1) * 10, parseInt(page) * 10 - 1);
    }
    ctx.body = jsonResp('ok', 'success', {
        comments: comments
    });
};

export const userComments = async (ctx: any) => {
    const page = ctx.query.page;
    let comments = await Comment.findAll({
        where: {
            userId: ctx.session.user.id
        }
    });
    if (page && isInt(page) && parseInt(page) > 0) {
        comments = comments.slice((parseInt(page) - 1) * 10, parseInt(page) * 10 - 1);
    }
    ctx.body = jsonResp('ok', 'success', {
        comments: comments
    });
};
