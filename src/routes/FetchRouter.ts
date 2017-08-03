import { UrlObject } from './../interfaces/UrlObjectInterface';
import { UrlExtractor } from './../UrlExtractor';
import {Router, Request, Response, NextFunction} from 'express';
const request = require('request-json');
import * as urldecode from 'urldecode';

export class FetchRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * Fetch the URL Requested
     * @param req 
     * @param res 
     * @param next 
     */
    public fetch = (req: Request, res: Response, next) => {

        try {
            let urlObject = this.extractUrl(req.params.url);

            var client = request.createClient(urlObject.origin);
            let queryString = this.buildQueryString(urlObject.query);


            client.get(`${urlObject.pathname.replace('/', '')}?${queryString}`, (error, response, body) => {
                res.send({
                    data: body,
                    cacheDate: new Date(),
                    requestOrigin: null,
                    origionalUrl: urlObject.href
                });
            });


        } catch (e) {
            res.send({
                data: 'invalid / unauthorized url',
                cacheDate: null,
                requestOrigin: null,
                origionalUrl: null
            });
        }
        
    }

    private buildQueryString(queryObject) {
        return Object.keys(queryObject)
                        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`)
                        .join('&');
    }

    private extractUrl(url: string):UrlObject {
        let extractor = new UrlExtractor(url);
        return extractor.validate();
    }

    private init() {
        this.router.get('/:url', this.fetch);
    }
}