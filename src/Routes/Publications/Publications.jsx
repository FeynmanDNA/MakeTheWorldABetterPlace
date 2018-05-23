import React from 'react';
// get current step from global_store
import { inject, observer } from 'mobx-react';

@inject('global_store')
@observer
class Publications extends React.Component {
  componentDidMount() {
    this.props.global_store.switchMenu("2");
  }
  
  render() {
    return (
      <p>pdfs here</p>
    );
  }
}

export default Publications;
