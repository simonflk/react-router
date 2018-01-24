function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import RouterContext from './RouterContext';
import warning from './routerWarning';

var RoutingContext = function (_React$Component) {
  _inherits(RoutingContext, _React$Component);

  function RoutingContext() {
    _classCallCheck(this, RoutingContext);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  RoutingContext.prototype.componentWillMount = function componentWillMount() {
    process.env.NODE_ENV !== 'production' ? warning(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : void 0;
  };

  RoutingContext.prototype.render = function render() {
    return React.createElement(RouterContext, this.props);
  };

  return RoutingContext;
}(React.Component);

export default RoutingContext;