import React from 'react';
import { InputNumber, Row, Col, Collapse } from 'antd';
// access the global_store to modify the SubmitBtnStatus
import { inject, observer } from 'mobx-react';

const Panel = Collapse.Panel;


@inject('global_store')
@observer
class AdvBDNAParam extends React.Component {
  state = {
    b_BValue: 0.5,
    A_BValue: 50,
    C_BValue: 95,
    lambda_B: 4.3,
  }

  /* User controlled range for b_B: [0.1, 5] nm; default value: 0.5 nm.
   * User controlled range for A_B: [10, 500] nm; default value: 50 nm.
   * User controlled range for C_B: [10, 500] nm; default value: 95 nm.
   * User controlled range for lambda_B: [-5, 10]; default value: 4.3.
   */

  componentWillUnmount() {
    this.props.global_store.addStateMobx(this.state);
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
  onChangeC_BValue = (value) => {
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
        C_BValue: value,
      });
    }
  }
  onChangelambda_B = (value) => {
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
        lambda_B: value,
      });
    }
  }
  render() {
    const customPanelStyle = {
      border: 0,
    };

    return (
      <Row>
        <Col span={24}>
          <Collapse bordered={false}>
            <Panel
              header="Individual DNA segment size in B-DNA state"
              style={customPanelStyle}
              key="1"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>b_B</b>, in (nm) unit, default is 0.5 nm
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="b_B"
                    min={0.1}
                    max={5}
                    step={0.1}
                    onChange={this.onChangeb_BValue}
                    value={this.state.b_BValue}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="Bending persistence length"
              style={customPanelStyle}
              key="2"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>A_B</b>, in (nm) unit, default is 50 nm
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="A_B"
                    min={10}
                    max={500}
                    step={0.1}
                    onChange={this.onChangeA_BValue}
                    value={this.state.A_BValue}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="Twisting persistence length"
              style={customPanelStyle}
              key="3"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>C_B</b>, in (nm) unit, default is 95 nm
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="C_B"
                    min={10}
                    max={500}
                    step={0.1}
                    onChange={this.onChangeC_BValue}
                    value={this.state.C_BValue}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="Scaling parameter"
              style={customPanelStyle}
              key="4"
            >
              <Row type="flex" align="center">
                <Col span={16}>
                  Determine B-DNA transition from the extended into supercoiled state (dimensionless)
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="lambda_B"
                    min={-5}
                    max={10}
                    step={0.1}
                    onChange={this.onChangelambda_B}
                    value={this.state.lambda_B}
                  />
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    );
  }
}

export default AdvBDNAParam;
