import React from 'react';
import CardView from './CardViewTF';
//imgs for the card
import ConstTorque from '../../../Assets/ConstTorque.png';
import ConstForce from '../../../Assets/ConstForce.png';
// get current step from global_store
// and to manage global states
import { inject, observer } from 'mobx-react';
import { Button, Icon, Col, Row } from 'antd';

const ButtonGroup = Button.Group;

const ConstTorqueInfo =  (
  <p>Constant torque, various force</p>
);

const ConstForceInfo = (
  <p>Constant force, various torque</p>
);

@inject('global_store')
@observer
class ChooseConstantTF extends React.Component {
  componentDidMount() {
    //stepbar show step2
    this.props.global_store.switchStep(1);
    // match.params is string
    const { calType } = this.props.match.params;
    // set the calType according to the url
    this.props.global_store.setCalType(calType);
  }

  clickTorque = () => {
    this.props.global_store.chooseMode("Constant Torque");
  }

  clickForce = () => {
    this.props.global_store.chooseMode("Constant Force");
  }

  ProceedtoInput = () => {
    if (
      this.props.global_store.calculator === "Bare DNA"
      &&
      this.props.global_store.mode === "Constant Torque"
    ) {
      return this.props.history.push(
        '/calculator/1/1/inputview'
      );
    } else if (
      this.props.global_store.calculator === "Bare DNA"
      &&
      this.props.global_store.mode === "Constant Force"
    ) {
      return this.props.history.push(
        '/calculator/1/2/inputview'
      );
    }
    if (
      this.props.global_store.calculator === "With Nucleosome"
      &&
      this.props.global_store.mode === "Constant Torque"
    ) {
      return this.props.history.push(
        '/calculator/2/1/inputview'
      );
    } else if (
      this.props.global_store.calculator === "With Nucleosome"
      &&
      this.props.global_store.mode === "Constant Force"
    ) {
      return this.props.history.push(
        '/calculator/2/2/inputview'
      );
    }
    if (
      this.props.global_store.calculator === "With DNA-insert"
      &&
      this.props.global_store.mode === "Constant Torque"
    ) {
      return this.props.history.push(
        '/calculator/3/1/inputview'
      );
    } else if (
      this.props.global_store.calculator === "With DNA-insert"
      &&
      this.props.global_store.mode === "Constant Force"
    ) {
      return this.props.history.push(
        '/calculator/3/2/inputview'
      );
    }
  }

  ProceedBack = () => {
    this.props.history.push(
      '/calculator/choosecalculator'
    );
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="space-around">
          <Col span={8}>
            <CardView
              title="Constant Torque"
              imgsrc={ConstTorque}
              info={ConstTorqueInfo}
              handleClick={this.clickTorque}
            />
          </Col>
          <Col span={8}>
            <CardView
              title="Constant Force"
              imgsrc={ConstForce}
              info={ConstForceInfo}
              handleClick={this.clickForce}
            />
          </Col>
        </Row>
      <br />
        <ButtonGroup>
          <Button
            onClick={this.ProceedBack}
            type="primary"
          >
            <Icon type="left" />
            Go back
          </Button>
          <Button
            onClick={this.ProceedtoInput}
            type="primary"
            disabled={this.props.global_store.mode
              ? false
              : true}>
            Go forward
            <Icon type="right" />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default ChooseConstantTF;
