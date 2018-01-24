var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';

import deprecateObjectProperties from './deprecateObjectProperties';
import getRouteParams from './getRouteParams';
import { isReactChildren } from './RouteUtils';
import warning from './routerWarning';

var array = PropTypes.array,
    func = PropTypes.func,
    object = PropTypes.object;

/**
 * A <RouterContext> renders the component tree for a given router state
 * and sets the history object and the current location in context.
 */

var RouterContext = function (_React$Component) {
  _inherits(RouterContext, _React$Component);

  function RouterContext() {
    var _temp, _this, _ret;

    _classCallCheck(this, RouterContext);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.createElement = function (component, props) {
      return component == null ? null : _this.props.createElement(component, props);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  RouterContext.prototype.getChildContext = function getChildContext() {
    var _props = this.props,
        router = _props.router,
        history = _props.history,
        location = _props.location;

    if (!router) {
      process.env.NODE_ENV !== 'production' ? warning(false, '`<RouterContext>` expects a `router` rather than a `history`') : void 0;

      router = _extends({}, history, {
        setRouteLeaveHook: history.listenBeforeLeavingRoute
      });
      delete router.listenBeforeLeavingRoute;
    }

    if (process.env.NODE_ENV !== 'production') {
      location = deprecateObjectProperties(location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation');
    }

    return { history: history, location: location, router: router };
  };

  RouterContext.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        history = _props2.history,
        location = _props2.location,
        routes = _props2.routes,
        params = _props2.params,
        components = _props2.components;

    var element = null;

    if (components) {
      element = components.reduceRight(function (element, components, index) {
        if (components == null) return element; // Don't create new children; use the grandchildren.

        var route = routes[index];
        var routeParams = getRouteParams(route, params);
        var props = {
          history: history,
          location: location,
          params: params,
          route: route,
          routeParams: routeParams,
          routes: routes
        };

        if (isReactChildren(element)) {
          props.children = element;
        } else if (element) {
          for (var prop in element) {
            if (Object.prototype.hasOwnProperty.call(element, prop)) props[prop] = element[prop];
          }
        }

        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
          var elements = {};

          for (var key in components) {
            if (Object.prototype.hasOwnProperty.call(components, key)) {
              // Pass through the key as a prop to createElement to allow
              // custom createElement functions to know which named component
              // they're rendering, for e.g. matching up to fetched data.
              elements[key] = _this2.createElement(components[key], _extends({
                key: key }, props));
            }
          }

          return elements;
        }

        return _this2.createElement(components, props);
      }, element);
    }

    !(element === null || element === false || React.isValidElement(element)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'The root route must render a single element') : invariant(false) : void 0;

    return element;
  };

  return RouterContext;
}(React.Component);

RouterContext.propTypes = {
  history: object,
  router: object.isRequired,
  location: object.isRequired,
  routes: array.isRequired,
  params: object.isRequired,
  components: array.isRequired,
  createElement: func.isRequired
};
RouterContext.defaultProps = {
  createElement: React.createElement
};
RouterContext.childContextTypes = {
  history: object,
  location: object.isRequired,
  router: object.isRequired
};


export default RouterContext;