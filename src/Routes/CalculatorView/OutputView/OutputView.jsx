import React from 'react';
//axios to send ajax request
import axios from 'axios';
import HTTPconfig from '../../../HTTPconfig';
// get current states from global_store
import { inject, observer } from 'mobx-react';
import { Button, Icon, Spin, Alert } from 'antd';

const ButtonGroup = Button.Group;


@inject('global_store')
@observer
class OutputView extends React.Component {
  state = {
    forceArray: [],
    extArray: [],
    torqueArray: [],
    superHelixArray: [],
    ResultLoading: false,
    ServiceError: false,
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
    // activate calculation
    await this.loadCalculation();
  }

  async loadCalculation() {
    // TODO: need to catch empty JSON error sent
    await this.setState({
      ResultLoading: true
    });
    // send a POST request
    try {
      const Result = await axios({
        // set the request content type to application/json for the .json property to work
        // `headers` are custom headers to be sent
        method: 'post',
        url: HTTPconfig.gateway,
        headers: HTTPconfig.HTTP_HEADER,
        data: this.props.global_store.FormInputs,
      });
      console.log(Result);
      await this.setState({
        forceArray: Result.data,
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
        <h3>
          Inputs for {this.props.global_store.calculator}
          &nbsp;with {this.props.global_store.mode}
        </h3>
        <Alert
          message="Error Text"
          description="Error Description Error Description Error Description Error Description Error Description Error Description"
          type="error"
          closable
        />
        <Spin spinning={this.state.ResultLoading}>
          <h1>Loaded!</h1>
        </Spin>
        <Spin spinning={this.state.Reviews_loading}>
          {this.state.ResultLoading
            ? <p>Loading...</p>
            : <p>Loaded</p>}
        </Spin>
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
      </React.Fragment>
    );
  }
}
export default OutputView;
