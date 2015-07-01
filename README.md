#react-dialog

这是一个用react写的dialog插件

用法:
```javascript
var React = require('react');
var Dialog = require('./src/dialog');

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
    <div>
      <button onClick={this._onShowDialog}></button>
      <Dialog show={this.state.showDialog} onCloseClick={this._onCloseDialog}>
        这是一个例子
      </Dialog>
    </div>
  }
})
```