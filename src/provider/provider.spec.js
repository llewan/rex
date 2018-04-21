const React = require('react');
const expect = require('chai').expect;
const shallow = require('enzyme').shallow;
const spy = require('sinon').spy;

const Provider = require('./provider');

describe('<Provider />', () => {
  const Entity = {
    name: 'Jhon',
    getName() {
      return this.name;
    },
    setName(aName) {
      this.name = aName;
    }
  };

  const context = {};
  const wrapper = shallow(<Provider entities={[Entity]}><div><h1></h1></div></Provider>, { context });

  const instance = wrapper.instance();

  it('should render childrens', () => {
    expect(wrapper.find('div').length).equal(1);
    expect(wrapper.find('h1').length).equal(1);
  });

  it('should assign entities to context', () => {
    expect(instance.getChildContext()).deep.equal({
      entities: [Entity]
    })
  });

  it('should proxify entities', () => {
    let spy = 0;
    instance.instances.push(() => { spy += 1 });
    instance.entities[0].setName('Carlos');
    instance.entities[0].getName();
    instance.entities[0].setName('Leo');
    expect(spy).equal(2);
  });

  it('should add a subscribe method to proxified entities', () => {
    expect(instance.entities[0].__subscribe).to.be.ok;
    expect(instance.entities[0].__subscribe).to.be.a('function');
  });
});