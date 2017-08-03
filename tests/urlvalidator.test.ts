import { UrlExtractor } from './../src/UrlExtractor';
import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

//TODO extend this test and code to be bullet proof
describe('Test URL Validator', () => {

    it('should throw exception on invalid url', () => {
        chai.expect(() => {
            let validator = new UrlExtractor('foobar').validate();
        }).to.throw('Invalid Url');
    });

    it('should throw exception on not http/http', () => {
        chai.expect(() => {
            let validator = new UrlExtractor('httx://www.google.com').validate();
        }).to.throw('Malformed Url');
    });

    it('should return http for http url', () => {
        let validator = new UrlExtractor('http://www.google.com'),
            url = validator.validate();

        chai.expect(url.protocol).to.equal('http:');
    });

    it('should return google.com for google url encoded', () => {
        let validator = new UrlExtractor('http%3A%2F%2Fwww.google.com'),
            url = validator.validate();

        chai.expect(url.hostname).to.equal('www.google.com');
    });
    
});