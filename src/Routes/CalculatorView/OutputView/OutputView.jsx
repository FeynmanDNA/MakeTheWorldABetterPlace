import React from 'react';
//axios to send ajax request
import axios from 'axios';
// get current states from global_store
import { inject, observer } from 'mobx-react';
import { Button, Icon } from 'antd';

const ButtonGroup = Button.Group;


@inject('global_store')
@observer
class OutputView extends React.Component {
  componentDidMount() {
    //stepbar show step4
    this.props.global_store.switchStep(3);
    // match.params is string
    const { calType } = this.props.match.params;
    const { calMode } = this.props.match.params;
    // set the calType according to the url
    this.props.global_store.setCalType(calType);
    // set the calMode according to the url
    this.props.global_store.setCalMode(calMode);
    // TODO: ajax the input json
    // this.global_store.axiosInput
    console.log("FormInputs is: ", this.props.global_store.FormInputs);
    console.log(this.props.global_store.FormInputs.force.length);
    // set the request content type to application/json for the .json property to work
    axios({
      method: 'post',
      url: 'http://localhost:7717/BareDNA',
      headers: {"Content-Type": "application/json"},
      data: this.props.global_store.FormInputs,
    });

  }

  componentWillUnmount() {
  }

  ProceedBack = () => {
    this.props.history.push(
      '/calculator/'
      +this.props.global_store.calType
      +'/'
      +this.props.global_store.calMode
      +'/inputview'
    );
  }

  HandleReCalculation = () => {
    this.props.history.push(
      '/calculator/choosecalculator'
    );
  }

  render() {
    return (
      <div>
        <h3>
          Inputs for {this.props.global_store.calculator}
          &nbsp;with {this.props.global_store.mode}
        </h3>
        <ButtonGroup>
          <Button
            onClick={this.ProceedBack}
            type="primary"
          >
            <Icon type="left" />
            Go back
          </Button>
          <Button
            onClick={this.HandleReCalculation}
            type="primary"
          >
            Restart
            <Icon type="reload" />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
export default OutputView;
