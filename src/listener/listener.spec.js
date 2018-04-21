const React = require('react');
const expect = require('chai').expect;
const shallow = require('enzyme').shallow;
const spy = require('sinon').spy;

const Listener = require('./listener');

describe('<Listener />', () => {
  const entity = { __subscribe: (fn) => {}, get: () => 'hi!'};
  const context = { entities: [entity]};
  const subscribeSpy = spy(entity, '__subscribe');

  const wrapper = shallow(<Listener>
    { (entity) => (<input value={entity.get()} />)}
  </Listener>, { context });

  const instance = wrapper.instance();

  it('should be connected to context', () => {
    expect(wrapper.context().entities.length).equal(1)
  });

  it('should subscribe current update method to entity', () => {
    expect(subscribeSpy.calledWith(instance.update)).to.be.ok;
    subscribeSpy.restore();
  });

  it('should test update method', () => {
    const setStateSpy = spy(instance, 'setState');
    instance.update();
    expect(setStateSpy.calledWith({})).to.be.true;
    setStateSpy.restore();
  });

  it('should test render props', () => {
    expect(wrapper.find({ value: 'hi!'})).to.have.length(1)
  });
});