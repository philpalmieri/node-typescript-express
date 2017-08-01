import {Router, Request, Response, NextFunction} from 'express';

export class FetchRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }


    public fetch(req: Request, res: Response, next) {
        res.send({
            data: {},
            cacheDate: new Date(),
            requestOrigin: null,
            origionalUrl: ''
        });
    }

    public init() {
        this.router.get('/:url', this.fetch);
    }
}

let fetchRouter = new FetchRouter();
fetchRouter.init();

export default fetchRouter.router;