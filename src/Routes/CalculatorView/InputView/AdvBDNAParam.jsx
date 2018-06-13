import React from 'react';
import { InputNumber, Row, Col, Collapse } from 'antd';

const Panel = Collapse.Panel;


class AdvBDNAParam extends React.Component {
  state = {
    b_BValue: 0.5,
    A_BValue: 50,
    C_BValue: 95,
    lambdaValue: 4.3,
  }

  onChangeb_BValue = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      this.setState({
        b_BValue: value,
      });
    }
  }

  onChangeA_BValue = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      this.setState({
        A_BValue: value,
      });
    }
  }
  onChangeC_BValue = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      this.setState({
        C_BValue: value,
      });
    }
  }
  onChangelambdaValue = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      this.setState({
        lambdaValue: value,
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
                    id="lambdaValue"
                    min={-5}
                    max={10}
                    step={0.1}
                    onChange={this.onChangelambdaValue}
                    value={this.state.lambdaValue}
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
