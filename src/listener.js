const React = require('react');
const PropTypes = require('prop-types');

const DUMMY_STATE = {};
class Listener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.update = this.update.bind(this);
  }
  update() {
    this.setState(DUMMY_STATE);
  }
  render() {
    this.context.entities.forEach((entity) => {
      entity.__subscribe(this.update);
    });
    return this.props.children.apply(null, this.context.entities);
  }
}
Listener.contextTypes = {
  entities: PropTypes.arrayOf(PropTypes.object)
};

Listener.propTypes = {
  children: PropTypes.any.isRequired,
};

module.exports = Listener;