import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

//TODO extend this test and code to be bullet proof
describe('GET api/v1/fetch', () => {

  it('responds with JSON', () => {
    return chai.request(app).get('/api/v1/fetch/http%3A%2F%2Fwww.google.com')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  it('should include required fields', () => {
    return chai.request(app).get('/api/v1/fetch/http%3A%2F%2Fwww.google.com')
      .then(res => {
        expect(res.body).to.have.all.keys([
          'data',
          'cacheDate',
          'requestOrigin',
          'origionalUrl'
        ]);
      });
  });

  it('should return invalid url', () => {
    return chai.request(app).get('/api/v1/fetch/httx%3A%2F%2Fwww.google.comm')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.data).to.equal('invalid / unauthorized url');
        expect(res.body.cacheDate).to.be.null;
        expect(res.body.origionalUrl).to.be.null;
      });
  });

});
