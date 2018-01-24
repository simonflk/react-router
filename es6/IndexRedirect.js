function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import warning from './routerWarning';
import invariant from 'invariant';
import Redirect from './Redirect';
import { falsy } from './InternalPropTypes';

var string = PropTypes.string,
    object = PropTypes.object;

/**
 * An <IndexRedirect> is used to redirect from an indexRoute.
 */

var IndexRedirect = function (_React$Component) {
  _inherits(IndexRedirect, _React$Component);

  function IndexRedirect() {
    _classCallCheck(this, IndexRedirect);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  IndexRedirect.createRouteFromReactElement = function createRouteFromReactElement(element, parentRoute) {
    /* istanbul ignore else: sanity check */
    if (parentRoute) {
      parentRoute.indexRoute = Redirect.createRouteFromReactElement(element);
    } else {
      process.env.NODE_ENV !== 'production' ? warning(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
    }
  };

  /* istanbul ignore next: sanity check */
  IndexRedirect.prototype.render = function render() {
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : invariant(false) : void 0;
  };

  return IndexRedirect;
}(React.Component);

IndexRedirect.propTypes = {
  to: string.isRequired,
  query: object,
  state: object,
  onEnter: falsy,
  children: falsy
};


export default IndexRedirect;