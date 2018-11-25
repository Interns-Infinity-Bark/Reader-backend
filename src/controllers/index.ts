import { jsonResp } from '../utils/stringUtil';
import { Role } from '../models/User';

export const requireAdmin = async (ctx: any, next: any) => {
    if (ctx.session.admin) {
        await next();
    } else {
        ctx.body = jsonResp('error', '请先登录');
    }
};

export const requireLogin = async (ctx: any, next: any) => {
    if (ctx.session.user) {
        await next();
    } else {
        ctx.body = jsonResp('error', '请先登录');
    }
};

export const requireManager = async (ctx: any, next: any) => {
    if (Role.MANAGER === ctx.session.user.role) {
        await next();
    } else {
        ctx.body = jsonResp('error', '权限不足');
    }
};
