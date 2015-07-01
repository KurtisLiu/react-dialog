var React = require('react');

module.exports = {
  getContainer: function() {
    return React.findDOMNode(this.props.container) || document.body;
  },

  componentWillUnmount: function() {
    if(!this._target) {
      return;
    }
    React.unmountComponentAtNode(this._target);
    this.getContainer().removeChild(this._target);
  },

  componentDidMount: function() {
    this._target = document.createElement('div');
    this.getContainer().appendChild(this._target);
    this._renderLayer();
  },

  componentDidUpdate: function() {
    this._renderLayer();
  },

  _renderLayer: function() {
    React.render(this.renderLayer(), this._target);
  }

};