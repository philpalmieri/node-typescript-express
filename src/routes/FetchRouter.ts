import { UrlObject } from './../interfaces/UrlObjectInterface';
import { UrlExtractor } from './../UrlExtractor';
import {Router, Request, Response, NextFunction} from 'express';
const request = require('request-json');
import * as urldecode from 'urldecode';

import { Cache } from '../Cache';
import { RedisCache } from '../RedisCache';


export class FetchRouter {
    router: Router;
    cache: Cache;

    constructor() {
        this.router = Router();
        this.cache = new RedisCache();
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
            let queryString = this.buildQueryString(urlObject.query);

            this.cache.fetch(req.params.url, (cachedData)=>{
                if(cachedData) {
                    res.send({
                        data: cachedData,
                        requestOrigin: null,
                        originalUrl: urlObject.href,
                        fromCache: true
                    })
                } else {
                    var client = request.createClient(urlObject.origin);
                    client.get(`${urlObject.pathname.replace('/', '')}?${queryString}`, (error, response, body) => {
                        this.cache.set(req.params.url, body);
                        res.send({
                            data: body,
                            requestOrigin: null,
                            origionalUrl: urlObject.href,
                            fromCache: false
                        });
                    });
                }
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