// No Props No Mount
import React from 'react';
import _ from 'lodash';

function asyncComponent(WrappedComponent) {
  return class extends React.Component {
    render() {
      debugger;
      const { children } = this.props;
      const data = _.omit(this.props, children);
      let hasProps = true;
      _.forEach(data, (elm,key) => {
        if (_.isEmpty(elm) && !_.isFunction(elm)) {
            hasProps = false
            return false;
        };
      });

      return hasProps ? <WrappedComponent {...this.props} /> : <></>;
    }
  };
}

export default asyncComponent;