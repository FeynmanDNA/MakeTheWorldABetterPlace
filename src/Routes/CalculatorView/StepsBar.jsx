import React from 'react';
// antd js and css
import { Steps } from 'antd';
const Step = Steps.Step;

class StepsBar extends React.Component {
  render() {
    return (
      <div className="stepsbar">
        <Steps current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
        <p>step by step</p>
      </div>
    );
  }
}

export default StepsBar;
