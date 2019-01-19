import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon, Radio, Row, Col, Alert } from 'antd';
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
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


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
    yminExt:0,
    ymaxExt:1,
    yminHelix:0,
    ymaxHelix:1,
    SuperCoilDetected: false,
  };

  componentDidMount() {
    if (Object.keys(this.props.global_store.FormInputs)
      .length === 0) {
      console.log("please do not refresh the result page");
      return;
    }
    // first detect whether the calType and calMode
    const { calType, calMode, FormInputs } = this.props.global_store;
    // recalibrate the xaxis range according to FormInputs
    let minForce = Math.min(...FormInputs.force);
    minForce = minForce - 0.05*(Math.abs(minForce));
    let maxForce = Math.max(...FormInputs.force);
    maxForce = maxForce + 0.05*(Math.abs(maxForce));
    let minTorque = Math.min(...FormInputs.torque);
    minTorque = minTorque - 0.05*(Math.abs(minTorque));
    let maxTorque = Math.max(...FormInputs.torque);
    maxTorque = maxTorque + 0.05*(Math.abs(maxTorque));
    // calType 1,2,3,4; calMode 1,2;
    // BareDNA Version
    if (calType === "1") {
      if (calMode === "1") {
        this.setState({
          ConstLegend: `Torque: ${FormInputs.torque} pN*nm`,
          XaxisTitle: "Force",
          xmax: maxForce,
          xmin: minForce,
        });
      } else if (calMode === "2") {
        this.setState({
          ConstLegend: `Force: ${FormInputs.force} pN`,
          XaxisTitle: "Torque",
          xmax: maxTorque,
          xmin: minTorque,
        });
      }
    // With Nucleosome Version
    } else if (calType === "2") {
      if (calMode === "1") {
        this.setState({
          ConstLegend: `Torque: ${FormInputs.torque} pN*nm, with Protein Energy: ${FormInputs.mu_protein} kB*T`,
          XaxisTitle: "Force",
          xmax: maxForce,
          xmin: minForce,
        });
      } else if (calMode === "2") {
        this.setState({
          ConstLegend: `Force: ${FormInputs.force} pN, with Protein Energy: ${FormInputs.mu_protein} kB*T`,
          XaxisTitle: "Torque",
          xmax: maxTorque,
          xmin: minTorque,
        });
      }
    // With DNA-insert Version
    } else if (calType === "3") {
      if (calMode === "1") {
        this.setState({
          ConstLegend: `Torque: ${FormInputs.torque} pN*nm, with DNA-insert length: ${FormInputs.insert_length} %`,
          XaxisTitle: "Force",
          xmax: maxForce,
          xmin: minForce,
        });
      } else if (calMode === "2") {
        this.setState({
          ConstLegend: `Force: ${FormInputs.force} pN, with DNA-insert length: ${FormInputs.insert_length} %`,
          XaxisTitle: "Torque",
          xmax: maxTorque,
          xmin: minTorque,
        });
      }
    } else if (calType === "4") {
      this.setState({
        ConstLegend: `Torque: ${FormInputs.torque} pN*nm`,
        XaxisTitle: "Force",
        xmax: maxForce,
        xmin: minForce,
      });
    }
  }

  generateExtXY = () => {
    const { calMode, FormInputs } = this.props.global_store;
    // dataExtArray is the extension length array
    let ExtData = [];
    for (let i=0; i<this.props.dataExtArray.length; i++) {
      // if Rel Ext is negative, then convert to Zero,
      // and show notification msg
      if (this.props.dataExtArray[i]<0) {
        this.props.dataExtArray[i] = 0;
        this.setState({
          SuperCoilDetected: true,
        });
      }
      // then construct the array from XYEntry
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
    return ExtData;
  }

  generateSupHelXY = () => {
    const { calMode, FormInputs } = this.props.global_store;
    // dataHelArray is the Superhelical array
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
    return SupHelArray;
  }

  componentDidUpdate(prevProps, prevState) {
    // don't forget to compare props, or may cause infinite loop
    // generate data for plot in this.state.PlotData
    if (this.props.dataLoading !== prevProps.dataLoading) {
      if (!this.props.dataLoading) {
        // first generate the Extension Array
        const ExtData = this.generateExtXY();
        // also recalibrate the extension yaxis range
        let maxExt = Math.max(...this.props.dataExtArray);
        let minExt = Math.min(...this.props.dataExtArray);
        maxExt = maxExt + 0.05*(Math.abs(maxExt));
        minExt = minExt - 0.05*(Math.abs(minExt));
        // then generate the Superhelical Array
        const SupHelArray = this.generateSupHelXY();
        // also recalibrate the Superhelical yaxis range
        let maxSupHel = Math.max(...this.props.dataHelArray);
        let minSupHel = Math.min(...this.props.dataHelArray);
        maxSupHel = maxSupHel + 0.05*(Math.abs(maxSupHel));
        minSupHel = minSupHel - 0.05*(Math.abs(minSupHel));
        // finally store the new states
        this.setState({
          PlotData: ExtData,
          ExtBackup: ExtData,
          HelixBackup: SupHelArray,
          ymin: minExt,
          ymax: maxExt,
          yminExt: minExt,
          ymaxExt: maxExt,
          yminHelix: minSupHel,
          ymaxHelix: maxSupHel,
        });
      }
    }
  }

  selectYaxis = (e) => {
    if (e.target.value === "Relative DNA Ext") {
      this.setState( (currentState) => ({
        YaxisTitle: e.target.value,
        SelectHelix: false,
        PlotData: currentState.ExtBackup,
        ymin: currentState.yminExt,
        ymax: currentState.ymaxExt,
      }));
    } else {
      this.setState( (currentState) => ({
        YaxisTitle: e.target.value,
        SelectHelix: true,
        PlotData: currentState.HelixBackup,
        ymin: currentState.yminHelix,
        ymax: currentState.ymaxHelix,
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
        <Spin indicator={antIcon} spinning={this.props.dataLoading}>
          <div style={{overflowX: "auto"}}>
            <XYPlot
              margin={
                {
                  left:100,
                  right:50,
                  top:50
                }
              }
              xDomain={[this.state.xmin, this.state.xmax]}
              yDomain={[this.state.ymin, this.state.ymax]}
              height={300}
              width={840}
            >
              <HorizontalGridLines />
              <VerticalGridLines />
              <XAxis
                title={this.state.XaxisTitle}
                position="middle"
                tickTotal={10}
              />
              <YAxis
                title={this.state.YaxisTitle}
                position="middle"
              />
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
        {this.state.SuperCoilDetected &&
          <Alert
            message="Warning"
            description="We have detected supercoiled DNA conformation in the output, which is represented as negative DNA extension values. In the plot above, we consider their effective DNA extensions to be zero. For detailed information, please refer to the output.csv in the zip download. If an input's calculation produces supercoiled conformation state, that input's DNA extension and the DNA superhelical density linking number change can be ignored."
            type="warning"
            showIcon
          />
        }
      </React.Fragment>
    );
  }
}

export default VisGraph;
