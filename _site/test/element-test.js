// mocha --compilers js:babel-core/register
var chai = require('chai');
var expect = require('chai').expect;

describe('A basic test', function() {
  describe('First Test', function() {
    it('Should pass when everything ok', function () {
      expect(true).to.be.true;
    });
  });
  describe('Second Test', function() {
    it('Should pass when everything ok', function () {
      expect('qwe').to.equals('qwe');
    });
  });
});
