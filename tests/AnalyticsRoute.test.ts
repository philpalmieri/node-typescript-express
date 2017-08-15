import { Analytics, PCommAnalytics } from './../src/Analytics';
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const analytics = require('universal-analytics');

const  sinon = require('sinon');

//TODO extend this test and code to be bullet proof
describe('PUT api/v1/analytics/pageview', () => {

  it('responds with JSON', () => {
    return chai.request(app).put('/api/v1/analytics/pageview')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

//   it('should send passed data to analytics', () => {
//     let fakePackage = {
//         id: 'ABC-123-XYZ',
//         page: '/home',
//         title: 'Home'
//     };

//     let mock = sinon.mock(analytics);
//         mock.expects('initialize').withArgs(fakePackage.id);
//         mock.expects('pageview').withArgs(fakePackage.page, fakePackage.title);

//     return chai.request(app).put('/api/v1/analytics/pageview')
//       .send(fakePackage)
//       .then(res => {
//         mock.verify();
//       });
//   });

//   it('should return invalid url', () => {
//     return chai.request(app).get('/api/v1/fetch/httx%3A%2F%2Fwww.google.comm')
//       .then(res => {
//         expect(res.status).to.equal(200);
//         expect(res).to.be.json;
//         expect(res.body.data).to.equal('invalid / unauthorized url');
//         expect(res.body.cacheDate).to.be.null;
//         expect(res.body.origionalUrl).to.be.null;
//       });
//   });

//   it('should return expected object and url', () => {
//     let mockBody = {
//           "data": {
//             "-KqcuBx4_ZiSNBktdrPz": {
//               "code": 996,
//               "jobs": {
//                 "-KqcuBx4_ZiSNBktdrQ-": true
//               },
//               "key": "-KqcuBx4_ZiSNBktdrPz",
//               "name": "ECG Management Consultants TEST"
//             }
//           }
//         };

//     nock('http://ptime-api.pcommcloud.com').
//       get('/clients?search=ecg').
//       reply(200, 
//         mockBody
//       );

//       return chai.request(app).get('/api/v1/fetch/http%3A%2F%2Fptime-api.pcommcloud.com%2Fclients%3Fsearch%3Decg')
//           .then(res => {
//             expect(res.status).to.equal(200);
//             expect(res).to.be.json;
//             expect(res.body.data.data["-KqcuBx4_ZiSNBktdrPz"].name).to.equal(mockBody.data["-KqcuBx4_ZiSNBktdrPz"].name);
//             expect(res.body.origionalUrl).to.equal('http://ptime-api.pcommcloud.com/clients?search=ecg');
//       });

//   });

});
