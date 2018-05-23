import React from 'react';
// sync step across pages
import { inject, observer } from 'mobx-react';
// antd js and css
import { Steps } from 'antd';
const Step = Steps.Step;

@inject('global_store')
@observer
class StepsBar extends React.Component {
  render() {
    return (
      <div
        style={{
          paddingLeft:10,
          paddingRight: 70,
        }}>
        <Steps current={this.props.global_store.step}>
          <Step title="Choose Calculator" description="from three types of calculators" />
          <Step title="Choose Mode" description="Constant Force or Torque" />
          <Step title="Input Values" description="Parameters for calculation" />
          <Step title="Data and Plot" description="See the results" />
        </Steps>
      </div>
    );
  }
}

export default StepsBar;
