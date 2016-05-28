// Testing if name validator in contact section working properly on wrong name
// ================

// File to import
// import validator from '../assets/js/modules/validateName';

// Testing framework
import chai from 'chai';
import { expect as expect } from 'chai';

// Test
let filter = /^[a-zA-Z а-яА-Я ]{4,30}$/;
describe('Name input validation:  ', () => {
  it('normal name', () => {
    let testing = filter.test('User Admin');
    expect(testing).to.be.true;
  });
  it('Invalid character "."', () => {
    let testing = filter.test('User.Admin');
    expect(testing).to.be.false;
  });
  it('Numbers are not valid in name', () => {
    let testing = filter.test('User Admin123124');
    expect(testing).to.be.false;
  });
  it('Invalid + character in nam field', () => {
    let testing = filter.test('User+Admin');
    expect(testing).to.be.false;
  });
  it('Too short name', () => {
    let testing = filter.test('Q');
    expect(testing).to.be.false;
  });
  it('Too long name', () => {
    let testing = filter.test('Charles Philip Arthur George and me');
    expect(testing).to.be.false;
  });
  it('Using cyrillic alphabet', () => {
    let testing = filter.test('Пользователь');
    expect(testing).to.be.true;
  });
});
