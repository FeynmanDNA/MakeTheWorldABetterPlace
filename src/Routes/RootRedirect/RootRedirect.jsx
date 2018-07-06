import React from 'react';
// for current step and menu from global_store
import { inject, observer } from 'mobx-react';


@inject('global_store')
@observer
class RootRedirect extends React.Component {
  componentDidMount() {
    this.props.history.push('/calculator/choosecalculator');
  }

  render() {
    return (
      <p>Redirect to the calculator...</p>
    );
  }
}

export default RootRedirect;
