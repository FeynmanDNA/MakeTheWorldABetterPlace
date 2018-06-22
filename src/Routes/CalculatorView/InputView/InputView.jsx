import React from 'react';
import InputFormBareConF from './InputFormBareConF';
import InputFormBareConT from './InputFormBareConT';
import InputFormWithNulConF from './InputFormWithNulConF';
import InputFormWithNulConT from './InputFormWithNulConT';
import InputFormWithInsConF from './InputFormWithInsConF';
import InputFormWithInsConT from './InputFormWithInsConT';
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
    //clear the form inputs in the mobx state
    this.props.global_store.clearForm();
  }

  componentWillUnmount() {
    // all inputs in the form has default values, no need to clear when Unmount
    // re-activate the submit button for the next input view
    this.props.global_store.SubmitBtnStatus(true);
  }

  ProceedBack = () => {
    this.props.history.push(
      '/calculator/'
      +this.props.global_store.calType
      +'/choosemode'
    );
  }

  handleSubmit = () => {
    this.props.history.push(
      '/calculator/'
      +this.props.global_store.calType
      +'/'
      +this.props.global_store.calMode
      +'/results');
    // TODO: 
    // redirect to outputview route, and 
    // use the router to better integrate with state management
    // and send the calculation parameters
    // and let the outputview route wait for the ajax
    // sure, while it's loading the data you can show a spinner
    // make the outputview componentDidMount call the axios request in a service file
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
        return (<InputFormWithNulConF />);
      }
      if (this.props.global_store.calculator === "With Nucleosome"
          &&
          this.props.global_store.mode === "Constant Torque") {
        return (<InputFormWithNulConT />);
      }
      if (this.props.global_store.calculator === "With DNA-insert"
          &&
          this.props.global_store.mode === "Constant Force") {
        return (<InputFormWithInsConF />);
      }
      if (this.props.global_store.calculator === "With DNA-insert"
          &&
          this.props.global_store.mode === "Constant Torque") {
        return (<InputFormWithInsConT />);
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
            onClick={this.handleSubmit}
            type="primary"
            disabled={this.props.global_store.inputStatus === false
              ? true
              : false}
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
