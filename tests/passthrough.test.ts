import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

//TODO extend this test and code to be bullet proof
describe('GET api/v1/fetch/someencodedurl', () => {
    it('responds with JSON', () => {
        return chai.request(app).get('/api/v1/fetch/someencodedurl')
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
        });
    });

    it('should include required fields', () => {
    return chai.request(app).get('/api/v1/fetch/someencodedurl')
      .then(res => {
        expect(res.body).to.have.all.keys([
          'data',
          'cacheDate',
          'requestOrigin',
          'origionalUrl'
        ]);
      });
  });

});