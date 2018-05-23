import React from 'react';
// get current step from global_store
import { inject, observer } from 'mobx-react';

@inject('global_store')
@observer
class About extends React.Component {
  componentDidMount() {
    this.props.global_store.switchMenu("3");
  }
  
  render() {
    return (
      <p>These are the contributors for this project</p>
    );
  }
}

export default About;
