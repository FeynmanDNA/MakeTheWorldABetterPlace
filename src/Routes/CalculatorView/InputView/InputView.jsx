import React from 'react';
import InputForm from './InputForm';
// get current states from global_store
import { inject, observer } from 'mobx-react';
import { Button, Icon, Divider } from 'antd';


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
      +'/results'
    );
  }

  render() {
    // for eg:
    // calculator: "Bare DNA", mode: "Constant Torque"
    const { calculator, mode, inputStatus } = this.props.global_store;

    return (
      <React.Fragment>
        <Button
          onClick={this.ProceedBack}
          type="primary"
        >
          <Icon type="left" />
          Go back
        </Button>
        {" "}
        <Button
          onClick={this.handleSubmit}
          type="primary"
          disabled={inputStatus === false
            ? true
            : false}
        >
          Submit
          <Icon type="upload" />
        </Button>
        <Divider />
        <h3>
          Inputs for {calculator}
          &nbsp;with {calculator==="Polymer"
            ? "ZERO Torque"
            : mode}
        </h3>
        <InputForm
          calType={calculator}
          calMode={mode}
        />
      </React.Fragment>
    );
  }
}
export default InputView;
