import React from 'react';
import { Button, Icon } from 'antd';
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
      <div>
        <p>These are the contributors for this project</p>
        <Button type="primary">
          <span><Icon type="github" /></span>
          &nbsp;Contribute
        </Button>
      </div>
    );
  }
}

export default About;
