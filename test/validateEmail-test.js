// Testing if email validator in contact section working properly on wrong email's
// ================

// File to import
// import validator from '../assets/js/modules/validateEmail';

// Testing framework
import { expect as expect } from 'chai';

// Test
let filter = /^(([^<>+()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
describe('Email input validation:  ', () => {
  it('- gmail', () => {
    let testing = filter.test('user.email@gmail.com');
    expect(testing).to.be.true;
  });
  it('- ukr', () => {
    let testing = filter.test('user.email@ukr.net');
    expect(testing).to.be.true;
  });
  it('- mail', () => {
    let testing = filter.test('user.email@mail.com');
    expect(testing).to.be.true;
  });
  it('- hotmail', () => {
    let testing = filter.test('user.email_@hotmail.com');
    expect(testing).to.be.true;
  });
  it('- icloud', () => {
    let testing = filter.test('user.email-@icloud.com');
    expect(testing).to.be.true;
  });
  it('without com', () => {
    let testing = filter.test('user.email@gmail.');
    expect(testing).to.be.false;
  });
  it('without .com', () => {
    let testing = filter.test('email@gmail');
    expect(testing).to.be.false;
  });
  it('extra symbols', () => {
    let testing = filter.test('emai(l@gmail.com');
    expect(testing).to.be.false;
  });
  it('plus is not valid email symbol', () => {
    let testing = filter.test('+email@gmail.com');
    expect(testing).to.be.false;
  });
  it('unexpected symbol (', () => {
    let testing = filter.test('user.email(ii@gmail.com');
    expect(testing).to.be.false;
  });
});
