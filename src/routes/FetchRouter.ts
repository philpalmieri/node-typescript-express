import { UrlObject } from './../interfaces/UrlObjectInterface';
import { UrlExtractor } from './../UrlExtractor';
import {Router, Request, Response, NextFunction} from 'express';
import * as http from 'http';
import * as https from 'https';
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
            res.send({
                data: {},
                cacheDate: new Date(),
                requestOrigin: null,
                origionalUrl: urlObject.href
            });

        } catch(e) {
            res.send({
                data: 'invalid / unauthorized url',
                cacheDate: null,
                requestOrigin: null,
                origionalUrl: null
            });
        }
        
    }

    private extractUrl(url: string):UrlObject {
        let extractor = new UrlExtractor(url);
        return extractor.validate();
    }

    private init() {
        this.router.get('/:url', this.fetch);
    }
}