import * as crypto from 'crypto';

export const md5 = (context: string): string => {
    return crypto.createHash('md5').update(context).digest('hex');
};

export const jsonResp = (status: string, message: string, data?: any) => {
    return {
        status: status,
        message: message,
        data: data
    };
};
