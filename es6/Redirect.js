function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';
import { createRouteFromReactElement as _createRouteFromReactElement } from './RouteUtils';
import { formatPattern } from './PatternUtils';
import { falsy } from './InternalPropTypes';

var string = PropTypes.string,
    object = PropTypes.object;

/**
 * A <Redirect> is used to declare another URL path a client should
 * be sent to when they request a given URL.
 *
 * Redirects are placed alongside routes in the route configuration
 * and are traversed in the same manner.
 */

var Redirect = function (_React$Component) {
  _inherits(Redirect, _React$Component);

  function Redirect() {
    _classCallCheck(this, Redirect);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Redirect.createRouteFromReactElement = function createRouteFromReactElement(element) {
    var route = _createRouteFromReactElement(element);

    if (route.from) route.path = route.from;

    route.onEnter = function (nextState, replace) {
      var location = nextState.location,
          params = nextState.params;


      var pathname = void 0;
      if (route.to.charAt(0) === '/') {
        pathname = formatPattern(route.to, params);
      } else if (!route.to) {
        pathname = location.pathname;
      } else {
        var routeIndex = nextState.routes.indexOf(route);
        var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
        var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
        pathname = formatPattern(pattern, params);
      }

      replace({
        pathname: pathname,
        query: route.query || location.query,
        state: route.state || location.state
      });
    };

    return route;
  };

  Redirect.getRoutePattern = function getRoutePattern(routes, routeIndex) {
    var parentPattern = '';

    for (var i = routeIndex; i >= 0; i--) {
      var route = routes[i];
      var pattern = route.path || '';

      parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

      if (pattern.indexOf('/') === 0) break;
    }

    return '/' + parentPattern;
  };

  /* istanbul ignore next: sanity check */
  Redirect.prototype.render = function render() {
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, '<Redirect> elements are for router configuration only and should not be rendered') : invariant(false) : void 0;
  };

  return Redirect;
}(React.Component);

Redirect.propTypes = {
  path: string,
  from: string, // Alias for path
  to: string.isRequired,
  query: object,
  state: object,
  onEnter: falsy,
  children: falsy
};


export default Redirect;