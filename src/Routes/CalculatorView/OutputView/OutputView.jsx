import React from 'react';
//axios to send ajax request
import axios from 'axios';
import HTTPconfig from '../../../HTTPconfig';

import ResultPlot from './ResultPlot';

// get current states from global_store
import { inject, observer } from 'mobx-react';
import { Button, Icon, Alert } from 'antd';

const ButtonGroup = Button.Group;


@inject('global_store')
@observer
class OutputView extends React.Component {
  state = {
    extArray: [],
    superHelixArray: [],
    doneTime: "",
    elapsedTime: 0,
    startTime: "",
    outputFileID: "",
    ResultLoading: false,
    ServiceError: false,
    NoJSONError: false,
  }

  async componentDidMount() {
    //stepbar show step4
    this.props.global_store.switchStep(3);
    // match.params is string
    const { calType } = this.props.match.params;
    const { calMode } = this.props.match.params;
    // set the calType according to the url
    this.props.global_store.setCalType(calType);
    // set the calMode according to the url
    this.props.global_store.setCalMode(calMode);
    // if there is no JSON to sent, raise error
    if (Object.keys(this.props.global_store.FormInputs)
      .length === 0) {
      await this.setState({
        NoJSONError: true,
      });
    } else {
      // activate calculation
      let params = "";
      switch(calType) {
        case "1":
          params = "BareDNA";
          break;
        case "2":
          params = "WithNul";
          break;
        case "3":
          params = "WithIns";
          break;
        default:
          break;
      };
      await this.loadCalculation(params);
    }
  }

  async loadCalculation(params) {
    await this.setState({
      ResultLoading: true
    });
    // send a POST request
    try {
      const Result = await axios({
        // set the request content type to application/json for the .json property to work
        // `headers` are custom headers to be sent
        method: 'post',
        url: `${HTTPconfig.gateway}cpp_cal/${params}`,
        headers: HTTPconfig.HTTP_HEADER,
        data: this.props.global_store.FormInputs,
      });
      await this.setState({
        extArray: Result.data.ext_array,
        superHelixArray: Result.data.suphel_array,
        doneTime: Result.data.done_time,
        elapsedTime: Result.data.elapsed_time,
        startTime: Result.data.start_time,
        outputFileID: Result.data.download_file,
        ResultLoading: false,
      });
    } catch (error) {
      console.error(error);
      await this.setState({
        ServiceError: true,
      });
    }
  }

  componentWillUnmount() {
    // clear the global_store's FormInputs when leaving OutputView
    this.props.global_store.clearForm();
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
      <React.Fragment>
        {this.state.NoJSONError ? (
          <Alert
            message="No Input Values"
            description="Please submit the calculation parameters from Step 3"
            type="error"
            banner
          />
        ) : (
          <ResultPlot
            Loading={this.state.ResultLoading}
            EstTime={this.props.global_store.calType === "2"
              ? "5 minutes"
              : "20-30 seconds"}
            RelExtArray={this.state.extArray}
            HelixArray={this.state.superHelixArray}
            TimeStart={this.state.startTime}
            TimeEnd={this.state.doneTime}
            TimeElap={this.state.elapsedTime}
            FilePath={this.state.outputFileID}
          />
        )}
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
            Restart from Step1
            <Icon type="reload" />
          </Button>
        </ButtonGroup>
      </React.Fragment>
    );
  }
}
export default OutputView;
