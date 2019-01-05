import { jsonResp } from '../utils/stringUtil';

export const requireLogin = async (ctx: any, next: any) => {
    if (ctx.session.user || ctx.session.admin) {
        await next();
    } else {
        ctx.body = jsonResp('error', '请先登录');
    }
};

export const requireAdmin = async (ctx: any, next: any) => {
    if (ctx.session.admin) {
        await next();
    } else {
        ctx.body = jsonResp('error', '请先登录');
    }
};

export const requireUser = async (ctx: any, next: any) => {
    if (ctx.session.user) {
        await next();
    } else {
        ctx.body = jsonResp('error', '请先登录');
    }
};
