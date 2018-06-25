import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Radio, Row, Col } from 'antd';
// uber/react-vis library
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  DiscreteColorLegend,
  MarkSeries,
  Hint
} from 'react-vis';
// MUST imported the react-vis stylesheet
import '../../../../node_modules/react-vis/dist/style.css';
// get current states from global_store
import { inject, observer } from 'mobx-react';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


@inject('global_store')
@observer
class VisGraph extends React.Component {
  static propTypes = {
    dataLoading: PropTypes.bool.isRequired,
  };

  state = {
    value: null,
    ConstLegend: "",
    XaxisTitle: "",
    YaxisTitle: "Relative DNA Ext",
  };

  async componentDidMount() {
    // first detect whether the constant is force or torque
    const { calMode, FormInputs } = this.props.global_store;
    calMode === "1"
     ? (
       await this.setState({
         ConstLegend: `Torque: ${FormInputs.torque} pN*nm`,
         XaxisTitle: "Force",
       })
     )
     : (
       await this.setState({
         ConstLegend: `Force: ${FormInputs.force} pN`,
         XaxisTitle: "Torque",
       })
     );
    console.log("show me the state", this.state);
  }

  selectYaxis = (e) => {
    this.setState({
      YaxisTitle: e.target.value,
    });
  }

  getRandomData() {
    const randomYData = [...new Array(100)].map(() => (
      Math.round(Math.random())
    ));

    console.log("you called get random");
    return randomYData.map((val, idx) => {
      return {x: idx, y: val};
    });
  }

  _rememberValue = (value) => {
    this.setState({value});
  }

  _forgetValue = () => {
    this.setState({
      value: null
    });
  }

  render() {
    // for Vis Hint
    const { value } = this.state;

    const data = [
      {x: 0, y: 8},
      {x: -1, y: 5},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 1},
      {x: -5, y: 7},
      {x: 6, y: 6},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 0}
    ];

    return (
      <React.Fragment>
        <Row type="flex" justify="start" align="middle">
          <Col span={4}>
            <b>Select Y-axis:</b>
          </Col>
          <Col span={18}>
            <RadioGroup onChange={this.selectYaxis} defaultValue="Relative DNA Ext">
              <RadioButton value="Relative DNA Ext">
                Relative DNA extension
              </RadioButton>
              <RadioButton value="Superhelical density">
                Superhelical density
              </RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Spin spinning={this.props.dataLoading}>
          <div style={{overflowX: "auto"}}>
            <XYPlot
              height={300}
              width={840}>
              <HorizontalGridLines />
              <VerticalGridLines />
              <XAxis title={this.state.XaxisTitle} position="middle" />
              <YAxis title={this.state.YaxisTitle} position="middle" />
                <MarkSeries
                  color="#FF991F"
                  data={this.props.dataLoading
                    ? [{x:0, y:0}]
                    : data}
                  onValueMouseOver={this._rememberValue}
                  onValueMouseOut={this._forgetValue}
                />
              {value
                ? <Hint value={value} />
                : null
              }
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
