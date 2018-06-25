import React from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';

// uber/react-vis library
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  DiscreteColorLegend,
  MarkSeries
} from 'react-vis';
// MUST imported the react-vis stylesheet
import '../../../../node_modules/react-vis/dist/style.css';

// get current states from global_store
import { inject, observer } from 'mobx-react';


@inject('global_store')
@observer
class VisGraph extends React.Component {
  static propTypes = {
    dataLoading: PropTypes.bool.isRequired,
  };

  state = {
    ConstLegend: "",
  };

  async componentDidMount() {
    // first detect whether the constant is force or torque
    const { calMode, FormInputs } = this.props.global_store;
    calMode === "1"
     ? (
       await this.setState({
         ConstLegend: `Torque: ${FormInputs.torque} pN*nm`
       })
     )
     : (
       await this.setState({
         ConstLegend: `Force: ${FormInputs.force} pN`
       })
     );
    console.log("show me the state", this.state);
  }

  render() {
    const data = [
      {x: 0, y: 8},
      {x: 1, y: 5},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 1},
      {x: 5, y: 7},
      {x: 6, y: 6},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 0}
    ];

    return (
      <React.Fragment>
        <Spin spinning={this.props.dataLoading}>
          <div style={{overflowX: "auto"}}>
            <XYPlot
              height={300}
              width={840}>
              <HorizontalGridLines />
              <VerticalGridLines />
              <XAxis title="X axis here" position="start" />
              <YAxis title="Y axis here!" />
                <MarkSeries
                  color="#FF991F"
                  data={this.props.dataLoading
                    ? [{x:0, y:0}]
                    : data}
                />
            </XYPlot>
          </div>
        </Spin>
        <DiscreteColorLegend
          colors={[
            '#FF991F',
          ]}
          items={[
            this.state.ConstLegend
          ]}
        />
      </React.Fragment>
    );
  }
}

export default VisGraph;
