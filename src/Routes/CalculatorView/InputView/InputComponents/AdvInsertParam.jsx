import React from 'react';
import { InputNumber, Row, Col, Collapse } from 'antd';
// access the global_store to addStateMobx
import { inject, observer } from 'mobx-react';

const Panel = Collapse.Panel;


@inject('global_store')
@observer
class AdvBDNAParam extends React.Component {
  state = {
    A_B_insert: 50,
    C_B_insert: 95,
    lambda_B_insert: 4.3,
    mu_L_insert: 4.9,
    lk_L_0_insert: -0.16,
    mu_P_insert: 17.8,
    lk_P_0_insert: 0.24,
    mu_S_insert: 5.1,
    lk_S_0_insert: -0.07,
  }

  componentWillUnmount() {
    this.props.global_store.addStateMobx("forInsert", this.state);
  }

  onChangeA_B_insert = (value) => {
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
        A_B_insert: value,
      });
    }
  }

  onChangeC_B_insert = (value) => {
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
        C_B_insert: value,
      });
    }
  }

  onChangelambda_B_insert = (value) => {
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
        lambda_B_insert: value,
      });
    }
  }

  onChangemu_L_insert = (value) => {
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
        mu_L_insert: value,
      });
    }
  }

  onChangelk_L_0_insert = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      // when user is in the middle keying dot
      // do not set state
      if (typeof(value) === "string") {
        return;
      }
      value = +(value).toFixed(2);
      this.setState({
        lk_L_0_insert: value,
      });
    }
  }

  onChangemu_P_insert = (value) => {
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
        mu_P_insert: value,
      });
    }
  }

  onChangelk_P_0_insert = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      // when user is in the middle keying dot
      // do not set state
      if (typeof(value) === "string") {
        return;
      }
      value = +(value).toFixed(2);
      this.setState({
        lk_P_0_insert: value,
      });
    }
  }

  onChangemu_S_insert = (value) => {
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
        mu_S_insert: value,
      });
    }
  }

  onChangelk_S_0_insert = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      // when user is in the middle keying dot
      // do not set state
      if (typeof(value) === "string") {
        return;
      }
      value = +(value).toFixed(2);
      this.setState({
        lk_S_0_insert: value,
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
              header="Insert B-DNA's bending persistence length"
              style={customPanelStyle}
              key="1"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>A_B_insert</b>, in (nm) unit, default is 50 nm
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="A_B_insert"
                    min={10}
                    max={500}
                    step={0.1}
                    onChange={this.onChangeA_B_insert}
                    value={this.state.A_B_insert}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="Insert B-DNA's twisting persistence length"
              style={customPanelStyle}
              key="2"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>C_B_insert</b>, in (nm) unit, default is 95 nm
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="C_B_insert"
                    min={10}
                    max={500}
                    step={0.1}
                    onChange={this.onChangeC_B_insert}
                    value={this.state.C_B_insert}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="lambda parameter for Insert B-DNA"
              style={customPanelStyle}
              key="3"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>lambda_B_insert</b>, dimensionless scaling factor, default is 4.3
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="lambda_B_insert"
                    min={-5}
                    max={10}
                    step={0.1}
                    onChange={this.onChangelambda_B_insert}
                    value={this.state.lambda_B_insert}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="Base-pairing energy difference between L- and B-DNA in [k_B*T] units at zero torque for the DNA insert"
              style={customPanelStyle}
              key="4"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>mu_L_insert</b>, in (kB*T) unit, default is 4.9 kB*T
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="mu_L_insert"
                    min={-50}
                    max={50}
                    step={0.1}
                    onChange={this.onChangemu_L_insert}
                    value={this.state.mu_L_insert}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="Relaxed linking number difference per single base-pair between L- and B-DNA for the DNA insert (dimensionless)"
              style={customPanelStyle}
              key="5"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>lk_L_0_insert</b>, here 16 bp – helical repeat of L-DNA, 10.4 bp – helical repeat of B-DNA, default value: - 1/16 - 1/10.4
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="lk_L_0_insert"
                    min={-0.5}
                    max={0.5}
                    step={0.01}
                    onChange={this.onChangelk_L_0_insert}
                    value={this.state.lk_L_0_insert}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="Base-pairing energy difference between P- and B-DNA in [k_B*T] units at zero torque for the DNA insert"
              style={customPanelStyle}
              key="6"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>mu_P_insert</b>, in (kB*T) unit, default is 17.8 kB*T
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="mu_P_insert"
                    min={-50}
                    max={50}
                    step={0.1}
                    onChange={this.onChangemu_P_insert}
                    value={this.state.mu_P_insert}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="Relaxed linking number difference per single base-pair between P- and B-DNA for the DNA insert (dimensionless)"
              style={customPanelStyle}
              key="7"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>lk_P_0_insert</b>, here 3 bp – helical repeat of P-DNA, 10.4 bp – helical repeat of B-DNA, default value: 1/3 - 1/10.4
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="lk_P_0_insert"
                    min={-0.5}
                    max={0.5}
                    step={0.01}
                    onChange={this.onChangelk_P_0_insert}
                    value={this.state.lk_P_0_insert}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="Base-pairing energy difference between S- and B-DNA in [k_B*T] units at zero torque for the DNA insert"
              style={customPanelStyle}
              key="8"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>mu_S_insert</b>, in (kB*T) unit, default is 5.1 kB*T
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="mu_S_insert"
                    min={-50}
                    max={50}
                    step={0.1}
                    onChange={this.onChangemu_S_insert}
                    value={this.state.mu_S_insert}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel
              header="Relaxed linking number difference per single base-pair between S- and B-DNA for the DNA insert (dimensionless)"
              style={customPanelStyle}
              key="9"
            >
              <Row type="flex" align="bottom">
                <Col span={16}>
                  <b>lk_S_0_insert</b>, here 35 bp – helical repeat of S-DNA, 10.4 bp – helical repeat of B-DNA, default value: 1/35 - 1/10.4
                </Col>
                <Col span={8}>
                  <InputNumber
                    id="lk_S_0_insert"
                    min={-0.5}
                    max={0.5}
                    step={0.01}
                    onChange={this.onChangelk_S_0_insert}
                    value={this.state.lk_S_0_insert}
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
