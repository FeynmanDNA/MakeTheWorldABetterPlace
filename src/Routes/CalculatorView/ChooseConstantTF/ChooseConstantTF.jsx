import React from 'react';
import CardView from './CardViewTF';
//imgs for the card
import ConstTorque from '../../../Assets/ConstTorque.png';
import ConstForce from '../../../Assets/ConstForce.png';
// get current step from global_store
// and to manage global states
import { inject, observer } from 'mobx-react';
import { Button, Icon, Col, Row, Divider } from 'antd';


const ConstTorqueInfo =  (
  <p>Plot the DNA (or polymer) <b>force-extension/force-superhelical-density curve</b> at a fixed value of the torque and predict the structural state of the DNA/polymer at given force values.</p>
);

const ConstForceInfo = (
  <p>Plot the DNA <b>torque-extension/torque-superhelical-density curve</b> at a fixed value of the force and predict the structural state of DNA at given torque values.</p>
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
    //clear the form inputs in the mobx state
    this.props.global_store.clearForm();
  }

  clickTorque = () => {
    this.props.global_store.chooseMode("Constant Torque");
    switch (this.props.global_store.calculator) {
      case "Bare DNA":
        this.props.history.push(
          '/calculator/1/1/inputview'
        );
        break;
      case "With Nucleosome":
        this.props.history.push(
          '/calculator/2/1/inputview'
        );
        break;
      case "With DNA-insert":
        this.props.history.push(
          '/calculator/3/1/inputview'
        );
        break;
      case "Polymer":
        this.props.history.push(
          '/calculator/4/1/inputview'
        );
        break;
      default:
        break;
    }
  }

  clickForce = () => {
    this.props.global_store.chooseMode("Constant Force");
    switch (this.props.global_store.calculator) {
      case "Bare DNA":
        this.props.history.push(
          '/calculator/1/2/inputview'
        );
        break;
      case "With Nucleosome":
        this.props.history.push(
          '/calculator/2/2/inputview'
        );
        break;
      case "With DNA-insert":
        this.props.history.push(
          '/calculator/3/2/inputview'
        );
        break;
      default:
        break;
    }
  }

  ProceedBack = () => {
    this.props.history.push(
      '/calculator/choosecalculator'
    );
  }

  render() {
    return (
      <React.Fragment>
        <Button
          onClick={this.ProceedBack}
          type="primary"
        >
          <Icon type="left" />
          Go back
        </Button>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <CardView
              title={<b>Constant Torque</b>}
              imgsrc={ConstTorque}
              info={ConstTorqueInfo}
              handleClick={this.clickTorque}
            />
          </Col>
          {/* Polymer calculator skips this page */}
          <Col span={12}>
            <CardView
              title={<b>Constant Force</b>}
              imgsrc={ConstForce}
              info={ConstForceInfo}
              handleClick={this.clickForce}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ChooseConstantTF;
