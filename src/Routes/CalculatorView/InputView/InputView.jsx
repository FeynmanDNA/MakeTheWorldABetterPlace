import React from 'react';
import InputFormBareConF from './InputFormBareConF';
import InputFormBareConT from './InputFormBareConT';
// get current states from global_store
import { inject, observer } from 'mobx-react';
import { Button, Icon } from 'antd';

const ButtonGroup = Button.Group;


@inject('global_store')
@observer
class InputView extends React.Component {
  componentDidMount() {
    //stepbar show step3
    this.props.global_store.switchStep(2);
    // match.params is string
    const { calType } = this.props.match.params;
    const { calMode } = this.props.match.params;
    // set the calType according to the url
    this.props.global_store.setCalType(calType);
    // set the calMode according to the url
    this.props.global_store.setCalMode(calMode);
  }

  ProceedBack = () => {
    this.props.history.push(
      '/calculator/'
      +this.props.global_store.calType
      +'/choosemode'
    );
  }

  render() {
    const ConditionalRenderForm = () => {
      if (this.props.global_store.calculator === "Bare DNA"
          &&
          this.props.global_store.mode === "Constant Force") {
        return (<InputFormBareConF />);
      }
      if (this.props.global_store.calculator === "Bare DNA"
          &&
          this.props.global_store.mode === "Constant Torque") {
        return (<InputFormBareConT />);
      }
      if (this.props.global_store.calculator === "With Nucleosome"
          &&
          this.props.global_store.mode === "Constant Force") {
        return (<InputFormBareConF />);
      }
      if (this.props.global_store.calculator === "With Nucleosome"
          &&
          this.props.global_store.mode === "Constant Torque") {
        return (<InputFormBareConF />);
      }
      if (this.props.global_store.calculator === "With DNA-insert"
          &&
          this.props.global_store.mode === "Constant Force") {
        return (<InputFormBareConF />);
      }
      if (this.props.global_store.calculator === "With DNA-insert"
          &&
          this.props.global_store.mode === "Constant Torque") {
        return (<InputFormBareConF />);
      }
    }

    return (
      <div>
        <h3>
          Inputs for {this.props.global_store.calculator}
          &nbsp;with {this.props.global_store.mode}
        </h3>
        {ConditionalRenderForm()}
        <ButtonGroup>
          <Button
            onClick={this.ProceedBack}
            type="primary"
          >
            <Icon type="left" />
            Go back
          </Button>
          <Button
            type="primary"
          >
            Submit
            <Icon type="upload" />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
export default InputView;
