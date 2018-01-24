function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import warning from './routerWarning';
import invariant from 'invariant';
import { createRouteFromReactElement as _createRouteFromReactElement } from './RouteUtils';
import { component, components, falsy } from './InternalPropTypes';

var func = PropTypes.func;

/**
 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
 * a JSX route config.
 */

var IndexRoute = function (_React$Component) {
  _inherits(IndexRoute, _React$Component);

  function IndexRoute() {
    _classCallCheck(this, IndexRoute);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  IndexRoute.createRouteFromReactElement = function createRouteFromReactElement(element, parentRoute) {
    /* istanbul ignore else: sanity check */
    if (parentRoute) {
      parentRoute.indexRoute = _createRouteFromReactElement(element);
    } else {
      process.env.NODE_ENV !== 'production' ? warning(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
    }
  };

  /* istanbul ignore next: sanity check */
  IndexRoute.prototype.render = function render() {
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : invariant(false) : void 0;
  };

  return IndexRoute;
}(React.Component);

IndexRoute.propTypes = {
  path: falsy,
  component: component,
  components: components,
  getComponent: func,
  getComponents: func
};


export default IndexRoute;