var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Link from './Link';

/**
 * An <IndexLink> is used to link to an <IndexRoute>.
 */

var IndexLink = function (_React$Component) {
  _inherits(IndexLink, _React$Component);

  function IndexLink() {
    _classCallCheck(this, IndexLink);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  IndexLink.prototype.render = function render() {
    return React.createElement(Link, _extends({}, this.props, { onlyActiveOnIndex: true }));
  };

  return IndexLink;
}(React.Component);

export default IndexLink;