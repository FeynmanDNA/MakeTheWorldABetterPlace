import React from 'react';
//axios to send ajax request
import axios from 'axios';
import HTTPconfig from '../../../HTTPconfig';

import ResultPlot from './ResultPlot';

// get current states from global_store
import { inject, observer } from 'mobx-react';
import { Button, Icon, Alert, Popconfirm, message, Divider } from 'antd';


@inject('global_store')
@observer
class OutputView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      extArray: [],
      superHelixArray: [],
      doneTime: "",
      elapsedTime: 0, // self-counter, not from Axios anymore
      startTime: "",
      queueID: "", // for Popen obj tracking
      outputFileID: "",
      ResultLoading: false,
      ServiceErrorServer: false, // if server is running
      NoJSONError: false, // if the inputForm is empty
      PopconfirmGoBackVisible: false,
      PopconfirmReCalVisible: false,
      NeedPopconfirm: false,
    };

    this.loadCalculation = this.loadCalculation.bind(this);
    this.checkCalStatus = this.checkCalStatus.bind(this);
    this.terminateCal = this.terminateCal.bind(this);
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
        case "4":
          params = "Polymer";
          break;
        default:
          break;
      };
      await this.loadCalculation(params);
    }
  }

  async loadCalculation(params) {
    await this.setState({
      ResultLoading: true,
      NeedPopconfirm: true,
    });
    // send a POST request
    try {
      const initiateCal = await axios({
        // set the request content type to application/json for the .json property to work
        // `headers` are custom headers to be sent
        method: 'post',
        url: `${HTTPconfig.gateway}cpp_cal/${params}`,
        headers: HTTPconfig.HTTP_HEADER,
        data: this.props.global_store.FormInputs,
      });
      console.log("initial axios response: ", initiateCal);
      if (initiateCal.data.error) {
        // if request method or credential or empty json
        console.error(initiateCal.data.error);
        // change state for UI
        await this.setState({
          ServiceErrorServer: true,
          NeedPopconfirm: false,
          ResultLoading: false,
        });
      }
      // if calculator started properly
      await this.setState({
        startTime: initiateCal.data.start_time,
        queueID: initiateCal.data.tracking_ID,
      });
      console.log("start polling");
      this.pollServer();
      this.countDoneTime();
    } catch (error) {
      // if server service error
      console.error(error);
      // clear all intervalFunctions
      await clearInterval(this.DoneTimeInterval);
      await clearInterval(this.intervalID);
      console.log("all intervals cleared")
      // change state for UI
      await this.setState({
        ServiceErrorServer: true,
        NeedPopconfirm: false,
        ResultLoading: false,
      });
    }
  }

  pollServer = () => {
    this.intervalID = setInterval(this.checkCalStatus, 5000);
    console.log("this.intervalID", this.intervalID);
  }

  async checkCalStatus() {
    // check calculation status
    try {
      const Result = await axios({
        method: 'get',
        url: `${HTTPconfig.gateway}cpp_cal/check_computation_status/${this.state.queueID}`,
      });
      console.log("subsequent axios response: ", Result);
      // if cpp breaks down halfway or fail to start
      if (Result.data.error) {
        console.error(Result.data.error);
        // clear all intervalFunctions
        await clearInterval(this.DoneTimeInterval);
        await clearInterval(this.intervalID);
        console.log("all intervals cleared")
        // change state for UI
        await this.setState({
          ServiceErrorServer: true,
          NeedPopconfirm: false,
          ResultLoading: false,
        });
        return;
      }
      if (Result.data.CppStatus === "calculating") {
        // still calculating, no update on the UI
        return;
      } else {
        clearInterval(this.DoneTimeInterval);
        console.log("elapsedTime counter stopped");
        await this.setState({
          extArray: Result.data.ext_array,
          superHelixArray: Result.data.suphel_array,
          doneTime: Result.data.done_time,
          outputFileID: Result.data.download_file,
          ResultLoading: false,
          NeedPopconfirm: false,
        });
        clearInterval(this.intervalID);
        console.log("polling stopped");
      }
    } catch (error) {
      console.error(error);
      // clear all intervalFunctions
      await clearInterval(this.DoneTimeInterval);
      await clearInterval(this.intervalID);
      console.log("all intervals cleared")
      // change state for UI
      await this.setState({
        ServiceErrorServer: true,
        ResultLoading: false,
        NeedPopconfirm: false,
      });
    }
  }

  countDoneTime = () => {
    this.DoneTimeInterval = setInterval(this.addSecDoneTime, 1000);
    console.log("this.DoneTimeInterval", this.DoneTimeInterval);
  }

  addSecDoneTime = () => {
    this.setState( (prevState) => ({
      elapsedTime: prevState.elapsedTime + 1,
    }))
  }

  async componentWillUnmount() {
    // clear the global_store's FormInputs when leaving OutputView
    await this.props.global_store.clearForm();
    // clear all intervalFunctions
    await clearInterval(this.DoneTimeInterval);
    await clearInterval(this.intervalID);
    console.log("all intervals cleared")
    if (this.state.ResultLoading) {
      // terminate the calculation
      await this.terminateCal();
      console.log("terminate the ongoing calculation");
      message.warning("calculation terminated", 6);
    }
    console.log("OutputView unmount, clear Axios call and formData");
  }

  async terminateCal() {
    try {
      const TerminatedSig = await axios({
        method: 'get',
        url: `${HTTPconfig.gateway}cpp_cal/kill_cal/${this.state.queueID}`,
      });
      console.log("TerminatedSig returned is: ", TerminatedSig);
    } catch (error) {
      console.error(error);
      await this.setState({
        ServiceErrorServer: true,
        ResultLoading: false,
        NeedPopconfirm: false,
      });
    }
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

  handlePopconfirmGoBackVisibleChange = () => {
    if (!this.state.NeedPopconfirm) {
      this.ProceedBack(); // if none loading, go back history
    } else {
      this.setState({
        PopconfirmGoBackVisible: true,
      });
    }
  }

  handlePopconfirmReCalVisibleChange = () => {
    if (!this.state.NeedPopconfirm) {
      this.HandleReCalculation(); // if none loading, restart step 1
    } else {
      this.setState({
        PopconfirmReCalVisible: true,
      });
    }
  }

  cancelPopconfirm = (e) => {
    this.setState({
      PopconfirmGoBackVisible: false,
      PopconfirmReCalVisible: false,
    });
    message.success("想象力可以改变一切");
  }

  render() {
    return (
      <React.Fragment>
        <Popconfirm
          title="Your calculation is still being processed. Do you want to leave this page?"
          visible={this.state.PopconfirmGoBackVisible}
          onVisibleChange={this.handlePopconfirmGoBackVisibleChange}
          onConfirm={this.ProceedBack}
          onCancel={this.cancelPopconfirm}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
          >
            <Icon type="left" />
            Go back
          </Button>
          {' '}
        </Popconfirm>
        <Popconfirm
          title="Your calculation is still being processed. Do you want to leave this page?"
          visible={this.state.PopconfirmReCalVisible}
          onVisibleChange={this.handlePopconfirmReCalVisibleChange}
          onConfirm={this.HandleReCalculation}
          onCancel={this.cancelPopconfirm}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
          >
            Restart from Step1
            <Icon type="reload" />
          </Button>
        </Popconfirm>
        <Divider />
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
            RelExtArray={this.state.extArray || ["NaN detected"]}
            HelixArray={this.state.superHelixArray || ["NaN detected"]}
            TimeStart={this.state.startTime}
            TimeEnd={this.state.doneTime}
            TimeElap={this.state.elapsedTime}
            FilePath={this.state.outputFileID}
            ServerError={this.state.ServiceErrorServer}
          />
        )}
      </React.Fragment>
    );
  }
}
export default OutputView;
