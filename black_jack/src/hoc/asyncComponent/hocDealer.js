// No Props No Mount
import React from 'react';
import _ from 'lodash';

function hocDealer(WrappedComponent) {
    return class extends React.Component {
        debugger;
        render() {
          const { children } = this.props;
          const data = _.omit(this.props, children);
          let hasProps = true;
    
          _.forEach(data, elm => {
            if (_.isEmpty(elm) && !_.isFunction(elm)) hasProps = false;
          });
    
          return hasProps ? <WrappedComponent {...this.props} /> : <></>;
        }
      };
}

export default hocDealer;