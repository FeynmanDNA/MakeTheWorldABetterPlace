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
    dataExtArray: PropTypes.array.isRequired,
    dataHelArray: PropTypes.array.isRequired,
  };

  state = {
    value: null,
    ConstLegend: "",
    XaxisTitle: "",
    YaxisTitle: "Relative DNA Ext",
    xmin:0,
    xmax:10,
    ymin:0,
    ymax:1.2,
    PlotData:[],
    ExtBackup:[],
    HelixBackup:[],
    SelectHelix: false,
  };
  //TODO: need to specify the ydomain too, otherwise the yaxis direction is off!!
  //TODO: select yaix also toggle the ydomain
  //TODO: clean up the name of ext and suphel

  componentDidMount() {
    if (Object.keys(this.props.global_store.FormInputs)
      .length === 0) {
      console.log("please do not refresh the result page");
      return;
    }
    // first detect whether the constant is force or torque
    // recalibrate the xaxis range according to FormInputs
    const { calMode, FormInputs } = this.props.global_store;
    const minForce = Math.min(...FormInputs.force);
    const maxForce = Math.max(...FormInputs.force);
    const minTorque = Math.min(...FormInputs.torque);
    const maxTorque = Math.max(...FormInputs.torque);
    calMode === "1"
     ? (
       this.setState({
         ConstLegend: `Torque: ${FormInputs.torque} pN*nm`,
         XaxisTitle: "Force",
         xmax: (
           maxForce + 0.1*(Math.abs(maxForce))
         ),
         xmin: (
           minForce - 0.1*(Math.abs(minForce))
         ),
       })
     )
     : (
       this.setState({
         ConstLegend: `Force: ${FormInputs.force} pN`,
         XaxisTitle: "Torque",
         xmax: (
           maxTorque + 0.1*(Math.abs(maxTorque))
         ),
         xmin: (
           minTorque - 0.1*(Math.abs(minTorque))
         ),
       })
     );
  }

  componentDidUpdate(prevProps, prevState) {
    // don't forget to compare props, or may cause infinite loop
    if (this.props.dataLoading !== prevProps.dataLoading) {
    // generate data for plot in this.state.PlotData
      const { calMode, FormInputs } = this.props.global_store;
      // first generate the Extension Array
      let ExtData = [];
      for (let i=0; i<this.props.dataExtArray.length; i++) {
        let XYEntry = {};
        if (calMode==="1") {
          // force array
          XYEntry = {
            x: FormInputs.force[i],
            y: this.props.dataExtArray[i]
          };
        } else {
          // torque array
          XYEntry = {
            x: FormInputs.torque[i],
            y: this.props.dataExtArray[i]
          };
        }
        ExtData.push(XYEntry);
      }
      // also recalibrate the extension yaxis range
      const maxExt = Math.max(...this.props.dataExtArray);
      let ExtRange = 1.1;
      if (maxExt>1) {
        ExtRange = 1.8;
      }
      // then generate the Superhelical Array
      let SupHelArray = [];
      for (let i=0; i<this.props.dataHelArray.length; i++) {
        let XYEntry = {};
        if (calMode==="1") {
          // force array
          XYEntry = {
            x: FormInputs.force[i],
            y: this.props.dataHelArray[i]
          };
        } else {
          // torque array
          XYEntry = {
            x: FormInputs.torque[i],
            y: this.props.dataHelArray[i]
          };
        }
        SupHelArray.push(XYEntry);
      }
      // also recalibrate the Superhelical yaxis range
      const maxSupHel = Math.max(...this.props.dataHelArray);
      let SupHelRange = 1.1;
      this.setState({
        PlotData: ExtData,
        ymax: ExtRange,
        ExtBackup: ExtData,
        HelixBackup: SupHelArray,
      });
    }
  }

  selectYaxis = (e) => {
    if (e.target.value === "Relative DNA Ext") {
      this.setState( (currentState) => ({
        YaxisTitle: e.target.value,
        SelectHelix: false,
        PlotData: currentState.ExtBackup,
      }));
    } else {
      this.setState( (currentState) => ({
        YaxisTitle: e.target.value,
        SelectHelix: true,
        PlotData: currentState.HelixBackup,
      }));
    }
  }

  // for Vis Hint
  _rememberValue = (value) => {
    this.setState({value});
  }

  // for Vis Hint
  _forgetValue = () => {
    this.setState({
      value: null
    });
  }

  render() {
    // for Vis Hint
    const { value } = this.state;

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
              xDomain={[this.state.xmin, this.state.xmax]}
              //yDomain={[this.state.ymin, this.state.ymax]}
              height={300}
              width={840}>
              <HorizontalGridLines />
              <VerticalGridLines />
              <XAxis
                title={this.state.XaxisTitle}
                position="middle"
                tickTotal={10}
              />
              <YAxis title={this.state.YaxisTitle} position="middle" />
                <MarkSeries
                  color={this.state.SelectHelix
                    ? "#0b0ebf"
                    : "#FF991F"
                  }
                  size={5}
                  data={this.props.dataLoading
                    ? [{x:0, y:0}]
                    : this.state.PlotData}
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
          colors={this.state.SelectHelix
            ? ["#0b0ebf"]
            : ["#FF991F"]
          }
          items={[
            this.state.ConstLegend
          ]}
        />
      </React.Fragment>
    );
  }
}

export default VisGraph;
