var React = require('react');
var Dialog = require('../src/dialog');

var App = React.createClass({
  getInitialState: function() {
    return {
      showDialog: false
    };
  },

  _onShowDialog: function() {
    this.setState({
      showDialog: true
    });
  },

  _onCloseDialog: function() {
    this.setState({
      showDialog: false
    });
  },

  render: function() {
    return (
      <div className="example-container">
        <button onClick={this._onShowDialog}>Toggle Dialog</button>
        <Dialog show={this.state.showDialog} onCloseClick={this._onCloseDialog} closeAfterClick={false}>
          这是一个例子
        </Dialog>
      </div>
    );
  }
});

React.render(<App />, document.body);