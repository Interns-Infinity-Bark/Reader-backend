import Book from '../models/Book';
import { isInt } from 'validator';
import { jsonResp } from '../utils/stringUtil';
import Chapter from '../models/Chapter';

export const addChapter = async (ctx: any) => {
    const { id, bookId, title, content, isVip } = ctx.request.body;
    if (!id) {
        ctx.body = jsonResp('error', 'id 不能为空');
        return;
    }
    if (!bookId) {
        ctx.body = jsonResp('error', 'bookId 不能为空');
        return;
    }
    const book = await Book.findOne({
        where: {
            id: bookId
        }
    });
    if (!book) {
        ctx.body = jsonResp('error', '图书不存在');
        return;
    }
    if (!title) {
        ctx.body = jsonResp('error', '标题不能为空');
        return;
    }
    if (!content) {
        ctx.body = jsonResp('error', '内容不能为空');
        return;
    }
    const chapter = new Chapter({
        id: id,
        bookId: bookId,
        title: title,
        content: content,
        isVip: isVip
    });
    await chapter.save();
    await book.$add('chapters', chapter);
    ctx.body = jsonResp('ok', '发布章节成功', {
        chapter: chapter
    });
};

export const chapters = async (ctx: any) => {
    const bookId = ctx.params.id;
    const page = ctx.query;
    const book = await Book.findOne({
        where: {
            id: bookId
        }
    });
    if (!book) {
        ctx.body = jsonResp('error', '图书不存在');
        return;
    }
    let chapters = await book.$get('chapters');
    if (!Array.isArray(chapters)) {
        chapters = [chapters];
    }
    if (page && isInt(page) && parseInt(page) > 0) {
        chapters = chapters.slice((parseInt(page) - 1) * 10, parseInt(page) * 10 - 1);
    }
    ctx.body = jsonResp('ok', 'success', {
        chapters: chapters
    });
};

export const chapter = async (ctx: any) => {
    const chapter = await Chapter.findOne({
        where: {
            id: ctx.params.id
        }
    });
    if (chapter) {
        ctx.body = jsonResp('ok', 'success', {
            chapter: chapter
        });
    } else {
        ctx.body = jsonResp('error', '章节不存在');
    }
};
