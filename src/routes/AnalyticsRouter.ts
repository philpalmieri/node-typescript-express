// import { Analytics, PCommAnalytics } from './../Analytics';
const analytics = require('universal-analytics');
import {Router, Request, Response, NextFunction} from 'express';
const request = require('request-json');
import * as urldecode from 'urldecode';

export class AnalyticsRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    // /**
    //  * Fetch the URL Requested
    //  * @param req 
    //  * @param res 
    //  * @param next 
    //  */
    // public fetch = (req: Request, res: Response, next: NextFunction) => {

    //     // try {
    //     //     let urlObject = this.extractUrl(req.params.url);

    //     //     var client = request.createClient(urlObject.origin);
    //     //     let queryString = this.buildQueryString(urlObject.query);


    //     //     client.get(`${urlObject.pathname.replace('/', '')}?${queryString}`, (error, response, body) => {
    //     //         res.send({
    //     //             data: body,
    //     //             cacheDate: new Date(),
    //     //             requestOrigin: null,
    //     //             origionalUrl: urlObject.href
    //     //         });
    //     //     });


    //     // } catch (e) {
    //     //     res.send({
    //     //         data: 'invalid / unauthorized url',
    //     //         cacheDate: null,
    //     //         requestOrigin: null,
    //     //         origionalUrl: null
    //     //     });
    //     // }
        
    // }

    public pageView = (req: Request, res: Response, next: NextFunction) => {
        
        let success = false;

        if(this.validate(req, 'pageView')) {
            let visitor = analytics(req.body.id);
            visitor.pageview(req.body.page, req.body.host, req.body.title).send();
            success = true;
        }

        res.send({
            success
        });
    }

    public event = (req: Request, res: Response, next: NextFunction) => {
        
        let success = false;

        if(this.validate(req, 'event')) {
            let visitor = analytics(req.body.id);
            visitor.event(req.body.category, req.body.action).send();
            success = true;
        }

        res.send({
            success
        });
    }

    private init() {
        this.router.put('/pageview', this.pageView);
        this.router.put('/event', this.event);
    }

    private validate(req: Request, type: string):boolean {
        if(!req.body.id) {
            return false;
        }
        
        if(type == 'pageView' && (
            (!req.body.page || req.body.page == '') ||
            (!req.body.title || req.body.title == '') ||
            (!req.body.host || req.body.host == '')
        )) {
            return false;
        }

        if(type == 'event' && (
            (!req.body.category || req.body.category == '') ||
            (!req.body.action || req.body.action == '')
        )) {
            return false;
        }

        return true;
    }
}