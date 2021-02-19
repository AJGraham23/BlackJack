// No Props No Mount
import React from 'react';
// import _ from 'lodash';

function asyncComponent(WrappedComponent) {
  return class extends React.Component {
    render() {
      let hasProps = true;
      if(!this.props.playerCards.length)
        hasProps = false;
      // // _.forEach(data, (elm,key) => {
      // //   if (_.isEmpty(elm) && !_.isFunction(elm) && typeof elm !== "boolean")
      // //   {
      // //       hasProps = false;
      // //       return false;
      // //   };
      // });

      return hasProps ? <WrappedComponent {...this.props} /> : <></>;
    }
  };
}

export default asyncComponent;