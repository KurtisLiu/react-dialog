require('./dialog.less');
var React = require('react');
var overlayMixins = require('./overlayMixins');
var PropTypes = React.PropTypes;

var Dialog = React.createClass({
  mixins: [overlayMixins],

  propTypes: {
    name: PropTypes.string,
    title: PropTypes.string,
    showOverlay: PropTypes.bool,
    draggable: PropTypes.bool,
    container: PropTypes.node,
    show: PropTypes.bool.isRequired,
    closeAfterClick: PropTypes.bool,
    onCloseClick: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      title: '',
      name: 'default',
      showOverlay: true,
      closeAfterClick: true,
      draggable: true
    };
  },

  componentDidMount: function() {
    this.setPosition();
  },

  componentDidUpdate: function() {
    this.setPosition();
  },

  setPosition: function() {
    if(!this._target) {
      return;
    }
    var ele = this._target.querySelector('.dialog');
    if(!ele) {
      return;
    }
    ele.style.top = (window.innerHeight - ele.offsetHeight)/2 + 'px';
    ele.style.left = (window.innerWidth - ele.offsetWidth)/2 + 'px';
    ele = null;
  },

  onCloseClick: function() {
    return this.props.onCloseClick();
  },

  onOverlayClick: function(e) {
    if (this.props.showOverlay) {
      if (e.target === e.currentTarget) {
        return this.onCloseClick();
      }
    }
  },

  onMouseDown: function(e) {
    var dialogEle = e.currentTarget.parentNode;
    var startX = e.clientX, startY = e.clientY;
    var top = dialogEle.offsetTop, left = dialogEle.offsetLeft;
    var diffX, diffY;
    var mousemoveHandler = function(e) {
      diffX = e.clientX - startX;
      diffY = e.clientY - startY;
      dialogEle.style.top = top + diffY + 'px';
      dialogEle.style.left = left + diffX + 'px';
    };
    var mouseupHandler = function(e) {
      startX = null;
      startY = null;
      diffX = null;
      diffY = null;
      document.body.removeEventListener('mousemove', mousemoveHandler);
      document.body.removeEventListener('mouseup', mouseupHandler);
    };
    document.body.addEventListener('mousemove', mousemoveHandler);
    document.body.addEventListener('mouseup', mouseupHandler);
  },

  _renderDialog: function() {
    var wrapCN = 'dialog-wrapper';
    wrapCN += this.props.showOverlay ? ' dialog-overlay': '';
    var headerCN = this.props.draggable ? 'dialog-header draggable' : 'dialog-header';
    var draggableHandler = this.props.draggable ? this.onMouseDown : null;
    var overlayClick = this.props.closeAfterClick ? this.onOverlayClick : null;
    var dialog = (
      <div className={wrapCN} onClick={overlayClick}>
        <div className={'dialog' + ' dialog-' + this.props.name}>
          <div className={headerCN} onMouseDown={draggableHandler}>
            <div className="dialog-title">{this.props.title}</div>
            <div className="dialog-close" onClick={this.onCloseClick}></div>
          </div>
          <div className="dialog-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
    draggableHandler = null;
    wrapCN = null;
    return dialog;
  },

  renderLayer: function() {
    if(!this.props.show) {
      return <span></span>;
    } else {

      return this._renderDialog();
    }
  },

  render() {
    return null;
  }
});

module.exports = Dialog;