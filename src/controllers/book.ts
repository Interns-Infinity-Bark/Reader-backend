import { Op } from 'sequelize';
import { isInt } from 'validator';
import Book from '../models/Book';
import { jsonResp } from '../utils/stringUtil';

export const addBook = async (ctx: any) => {
    const { id, title, author, category, wordCount, score, cover, introduction } = ctx.request.body;
    if (!id) {
        ctx.body = jsonResp('error', 'id 不能为空');
    } else if (await Book.findOne({
        where: {
            id
        }
    })) {
        ctx.body = jsonResp('error', '图书已存在');
    } else if (!title) {
        ctx.body = jsonResp('error', '标题不能为空');
    } else if (!author) {
        ctx.body = jsonResp('error', '作者不能为空');
    } else if (!category) {
        ctx.body = jsonResp('error', '分类不能为空');
    } else if (!wordCount) {
        ctx.body = jsonResp('error', '字数不能为空');
    } else if (!score) {
        ctx.body = jsonResp('error', '评分不能为空');
    } else if (!cover) {
        ctx.body = jsonResp('error', '封面链接不能为空');
    } else if (!introduction) {
        ctx.body = jsonResp('error', '图书简介不能为空');
    } else {
        const book = new Book({
            id: id,
            title: title,
            author: author,
            category: category,
            wordCount: wordCount,
            score: score,
            cover: cover,
            introduction: introduction
        });
        await book.save();
        ctx.body = jsonResp('ok', '发布图书成功', {
            book: book
        });
    }
};

export const books = async (ctx: any) => {
    const { title, page } = ctx.query;
    let books = title ? await Book.findAll({
        where: {
            title: {
                [Op.like]: '%' + title + '%'
            }
        }
    }) : await Book.findAll();
    if (page && isInt(page) && parseInt(page, 10) > 0) {
        books = books.slice((parseInt(page, 10) - 1) * 10, parseInt(page, 10) * 10 - 1);
    }
    ctx.body = jsonResp('ok', 'success', {
        books: books
    });
};

export const book = async (ctx: any) => {
    const book = await Book.findOne({
        where: {
            id: ctx.params.id
        }
    });
    if (book) {
        ctx.body = jsonResp('ok', 'success', {
            book: book
        });
    } else {
        ctx.body = jsonResp('error', '图书不存在');
    }
};
