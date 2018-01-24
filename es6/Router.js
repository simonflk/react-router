var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import createHashHistory from 'history/lib/createHashHistory';
import useQueries from 'history/lib/useQueries';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';

import createTransitionManager from './createTransitionManager';
import { routes } from './InternalPropTypes';
import RouterContext from './RouterContext';
import { createRoutes } from './RouteUtils';
import { createRouterObject, createRoutingHistory } from './RouterUtils';
import warning from './routerWarning';

function isDeprecatedHistory(history) {
  return !history || !history.__v2_compatible__;
}

/* istanbul ignore next: sanity check */
function isUnsupportedHistory(history) {
  // v3 histories expose getCurrentLocation, but aren't currently supported.
  return history && history.getCurrentLocation;
}

var func = PropTypes.func,
    object = PropTypes.object;

/**
 * A <Router> is a high-level API for automatically setting up
 * a router that renders a <RouterContext> with all the props
 * it needs each time the URL changes.
 */

var Router = function (_React$Component) {
  _inherits(Router, _React$Component);

  function Router() {
    var _temp, _this, _ret;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      location: null,
      routes: null,
      params: null,
      components: null
    }, _this.handleError = function (error) {
      if (_this.props.onError) {
        _this.props.onError.call(_this, error);
      } else {
        // Throw errors by default so we don't silently swallow them!
        throw error; // This error probably occurred in getChildRoutes or getComponents.
      }
    }, _this.createRouterObjects = function () {
      var matchContext = _this.props.matchContext;

      if (matchContext) {
        return matchContext;
      }

      var history = _this.props.history;
      var _this$props = _this.props,
          routes = _this$props.routes,
          children = _this$props.children;


      !!isUnsupportedHistory(history) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You have provided a history object created with history v3.x. ' + 'This version of React Router is not compatible with v3 history ' + 'objects. Please use history v2.x instead.') : invariant(false) : void 0;

      if (isDeprecatedHistory(history)) {
        history = _this.wrapDeprecatedHistory(history);
      }

      var transitionManager = createTransitionManager(history, createRoutes(routes || children));
      var router = createRouterObject(history, transitionManager);
      var routingHistory = createRoutingHistory(history, transitionManager);

      return { history: routingHistory, transitionManager: transitionManager, router: router };
    }, _this.wrapDeprecatedHistory = function (history) {
      var _this$props2 = _this.props,
          parseQueryString = _this$props2.parseQueryString,
          stringifyQuery = _this$props2.stringifyQuery;


      var createHistory = void 0;
      if (history) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a custom history please create it with `useRouterHistory`, see http://tiny.cc/router-usinghistory for details.') : void 0;
        createHistory = function createHistory() {
          return history;
        };
      } else {
        process.env.NODE_ENV !== 'production' ? warning(false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : void 0;
        createHistory = createHashHistory;
      }

      return useQueries(createHistory)({ parseQueryString: parseQueryString, stringifyQuery: stringifyQuery });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Router.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        parseQueryString = _props.parseQueryString,
        stringifyQuery = _props.stringifyQuery;

    process.env.NODE_ENV !== 'production' ? warning(!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : void 0;

    var _createRouterObjects = this.createRouterObjects(),
        history = _createRouterObjects.history,
        transitionManager = _createRouterObjects.transitionManager,
        router = _createRouterObjects.router;

    this._unlisten = transitionManager.listen(function (error, state) {
      if (error) {
        _this2.handleError(error);
      } else {
        _this2.setState(state, _this2.props.onUpdate);
      }
    });

    this.history = history;
    this.router = router;
  };

  /* istanbul ignore next: sanity check */
  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    process.env.NODE_ENV !== 'production' ? warning(nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : void 0;

    process.env.NODE_ENV !== 'production' ? warning((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : void 0;
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this._unlisten) this._unlisten();
  };

  Router.prototype.render = function render() {
    var _state = this.state,
        location = _state.location,
        routes = _state.routes,
        params = _state.params,
        components = _state.components;

    var _props2 = this.props,
        createElement = _props2.createElement,
        render = _props2.render,
        props = _objectWithoutProperties(_props2, ['createElement', 'render']);

    if (location == null) return null; // Async match

    // Only forward non-Router-specific props to routing context, as those are
    // the only ones that might be custom routing context props.
    Object.keys(Router.propTypes).forEach(function (propType) {
      return delete props[propType];
    });

    return render(_extends({}, props, {
      history: this.history,
      router: this.router,
      location: location,
      routes: routes,
      params: params,
      components: components,
      createElement: createElement
    }));
  };

  return Router;
}(React.Component);

Router.propTypes = {
  history: object,
  children: routes,
  routes: routes, // alias for children
  render: func,
  createElement: func,
  onError: func,
  onUpdate: func,

  // Deprecated:
  parseQueryString: func,
  stringifyQuery: func,

  // PRIVATE: For client-side rehydration of server match.
  matchContext: object
};
Router.defaultProps = {
  render: function render(props) {
    return React.createElement(RouterContext, props);
  }
};


export default Router;