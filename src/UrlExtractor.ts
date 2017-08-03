import { UrlObject } from './interfaces/UrlObjectInterface';
const decode = require('urldecode');
const urlParse = require('url-parse');
const validUrl = require('valid-url');


export class UrlExtractor {

    private decodedUrl: string;
    private urlObject: UrlObject;

    constructor(private url: string) {
        this.decodedUrl = decode(this.url);
        this.urlObject = urlParse(this.decodedUrl, true);
    }

    validate(): UrlObject {
        if (!this.validateUrl()) {
            throw Error('Invalid Url');
        }

        if (!this.validateStructure()) {
            throw Error('Malformed Url');
        }

        return this.urlObject;
    }

    private validateUrl() {
        return validUrl.isUri(this.decodedUrl);
    }

    private validateStructure() {
        if (['http:', 'https:'].indexOf(this.urlObject.protocol) == -1) {
            return false;
        }

        return true;
    }

}