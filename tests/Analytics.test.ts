import { Analytics } from './../src/Analytics';
import * as mocha from 'mocha';
import * as chai from 'chai';
const  sinon = require('sinon');
const analytics = require('universal-ga');

const expect = chai.expect;

const fakeId = 'ABC-123-XYZ';

//TODO extend this test and code to be bullet proof
describe('Test Analytics', () => {

    it('should initialize analytics', () => {
        let analyticsSubject = new Analytics;
        let mock = sinon.mock(analytics);
            mock.expects('initialize').withArgs(fakeId);
        
        analyticsSubject.initialize(fakeId);
        mock.verify();
    });

    it('should send a page request', () => {
        let analyticsSubject = new Analytics;
        let fakeOptions = {foo: 'bar', baz: 'buzz'};
        let fakePage = '/testpage';
        let mock = sinon.mock(analytics);
            mock.expects('pageview').withArgs(fakePage, fakeOptions);
        
        analyticsSubject.pageView(fakePage, fakeOptions);
        mock.verify();
    });

    it('should send a screen view', () => {
        let analyticsSubject = new Analytics;
        let fakeOptions = {foo: 'bar', baz: 'buzz'};
        let fakeScreen = 'screen name';
        let mock = sinon.mock(analytics);
            mock.expects('screenview').withArgs(fakeScreen, fakeOptions);
        
        analyticsSubject.screenView(fakeScreen, fakeOptions);
        mock.verify();
    });

    it('should send an event', () => {
        let analyticsSubject = new Analytics;
        let fakeOptions = {foo: 'bar', baz: 'buzz'};
        let fakeCategory = 'category';
        let fakeAction = 'action';
        let mock = sinon.mock(analytics);
            mock.expects('event').withArgs(fakeCategory, fakeAction, fakeOptions);
        
        analyticsSubject.event(fakeCategory, fakeAction, fakeOptions);
        mock.verify();
    });

    it('should send an event', () => {
        let analyticsSubject = new Analytics;
        let fakeDimension = 'dimension01';
        let fakeValue = 'value';
        let mock = sinon.mock(analytics);
            mock.expects('custom').withArgs(fakeDimension, fakeValue);
        
        analyticsSubject.custom(fakeDimension, fakeValue);
        mock.verify();
    });


});