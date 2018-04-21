const expect = require('chai').expect;
const index = require('./index');

describe('index', () => {
  it('should export an object', () => {
    expect(index).to.be.an('object');
  });

  it('should have a Listener property', () => {
    expect(index).to.have.a.property('Listener')
  });

  it('should have a Provider property', () => {
    expect(index).to.have.a.property('Provider')
  });
});