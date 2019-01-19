import React from 'react';
import { InputNumber, Row, Col, Divider } from 'antd';
// access the global_store to addStateMobx
import { inject, observer } from 'mobx-react';


@inject('global_store')
@observer
class AdvPolymerParam extends React.Component {
  state = {
    b_BValue: 0.1, // for polymer
    A_BValue: 10, // for polymer
    C_BValue: 0.1, // for polymer
    lambda_B: 4.3,
  }

  /* User controlled range for b_B: [0.1, 10] nm; default value: 0.1 nm.
   * User controlled range for A_B: [0.5, 10,000] nm; default value: 10 nm.
   * Polymer calculator:
    implemented Jan 18th 2019, with two previously advanced parameters as core parameters:
    1) b_B: segment length of polymer (A >= 5~10 b_B) [0.1-10]nm
    2) A: persistence length [0.5-10,000] (A <= 1000 b_B)
   */

  componentWillUnmount() {
    this.props.global_store.addStateMobx("forPolymer", this.state);
  }

  onChangeb_BValue = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      // when user is in the middle keying dot
      // do not set state
      if (typeof(value) === "string") {
        return;
      }
      value = +(value).toFixed(1);
      this.setState({
        b_BValue: value,
      });
    }
  }

  onChangeA_BValue = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      // when user is in the middle keying dot
      // do not set state
      if (typeof(value) === "string") {
        return;
      }
      value = +(value).toFixed(1);
      this.setState({
        A_BValue: value,
      });
    }
  }

  render() {
    return (
      <Row type="flex" justify="space-around">
        <Col span={24}>
          <Divider />
          <Row>
            <b>Segment length of polymer:</b>
          </Row>
          <Row type="flex" align="bottom">
            <Col span={16}>
              <b>b_Polymer</b>, in (nm) unit, default is 0.1 nm. [Range: 0.1 ~ 10nm]
            </Col>
            <Col span={8}>
              <InputNumber
                id="b_B"
                min={0.1}
                max={10}
                step={0.1}
                onChange={this.onChangeb_BValue}
                value={this.state.b_BValue}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <b>Polymer persistence length:</b>
          </Row>
          <Row type="flex" align="bottom">
            <Col span={16}>
              <b>A_Polymer</b>, in (nm) unit, default is 10 nm. <br />[1000*b_Polymer >= A_Polymer >= 5*b_Polymer]
            </Col>
            <Col span={8}>
              <InputNumber
                id="A_B"
                min={0.5}
                max={10000}
                step={0.1}
                onChange={this.onChangeA_BValue}
                value={this.state.A_BValue}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default AdvPolymerParam;
