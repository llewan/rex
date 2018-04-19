const React = require('react');
const PropTypes = require('prop-types');

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.instances = [];
    const update = () => {
      this.instances.forEach(instance => instance());
    };
    const handler = {
      set(target, property, value, receiver) {
        update();
        return Reflect.set(target, property, value);
      }
    };

    this.entities = props.entities.map(entity => {
      const proxy = new Proxy(entity, handler);
      proxy.__subscribe = fn => this.instances.push(fn);
      return proxy;
    });
  }
  getChildContext() {
    return { entities: this.entities };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  entities: PropTypes.bool
};

Provider.defaultProps = {
  entities: []
};

Provider.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

module.exports = Provider;
