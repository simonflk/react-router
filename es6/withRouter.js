var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import invariant from 'invariant';
import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { routerShape } from './PropTypes';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withRouter(WrappedComponent, options) {
  var withRef = options && options.withRef;

  var WithRouter = function (_React$Component) {
    _inherits(WithRouter, _React$Component);

    function WithRouter() {
      var _temp, _this, _ret;

      _classCallCheck(this, WithRouter);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.getWrappedInstance = function () {
        !withRef ? process.env.NODE_ENV !== 'production' ? invariant(false, 'To access the wrapped instance, you need to specify ' + '`{ withRef: true }` as the second argument of the withRouter() call.') : invariant(false) : void 0;

        return _this.wrappedInstance;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    WithRouter.prototype.render = function render() {
      var _this2 = this;

      var router = this.props.router || this.context.router;
      var props = _extends({}, this.props, { router: router });

      if (withRef) {
        props.ref = function (c) {
          _this2.wrappedInstance = c;
        };
      }

      return React.createElement(WrappedComponent, props);
    };

    return WithRouter;
  }(React.Component);

  WithRouter.contextTypes = { router: routerShape };
  WithRouter.propTypes = { router: routerShape };


  WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
  WithRouter.WrappedComponent = WrappedComponent;

  return hoistStatics(WithRouter, WrappedComponent);
}