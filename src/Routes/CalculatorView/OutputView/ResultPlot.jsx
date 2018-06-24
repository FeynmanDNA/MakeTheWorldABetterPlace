import React from 'react';

import InputSummary from './InputSummary';

// get current states from global_store
import { inject, observer } from 'mobx-react';
import { Spin } from 'antd';


@inject('global_store')
@observer
class ResultPlot extends React.Component {
  render() {
    return (
      <React.Fragment>
        <InputSummary />
        <Spin spinning={this.props.Loading}>
          <h1>this.state.forceArray</h1>
        </Spin>
        <Spin spinning={this.props.Loading}>
          {this.props.Loading
            ? <p>Loading...</p>
            : <p>Loaded</p>}
        </Spin>
      </React.Fragment>
    );
  }
}
export default ResultPlot;
