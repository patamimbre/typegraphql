import { Request } from 'express';

declare module "express-session" {
    interface Session {
        userId: number;
    }
}

export interface MyContext {
    req: Request;
}