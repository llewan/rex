const React = require('react');
const PropTypes = require('prop-types');

const DUMMY_STATE = {};
class EntitiesListener extends React.Component {
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
EntitiesListener.contextTypes = {
  entities: PropTypes.bool
};

module.exports = EntitiesListener;