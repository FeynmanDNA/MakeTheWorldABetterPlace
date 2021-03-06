import React from 'react';
import PropTypes from 'prop-types';
import HTTPconfig from '../../../HTTPconfig';

import InputSummary from './InputSummary';
import VisGraph from './VisGraph';

// get current states from global_store
import { inject, observer } from 'mobx-react';
import { Alert, Spin, Divider, Card, Button, Icon, Badge } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


@inject('global_store')
@observer
class ResultPlot extends React.Component {
  static propTypes = {
    Loading: PropTypes.bool.isRequired,
    EstTime: PropTypes.string.isRequired,
    RelExtArray: PropTypes.array.isRequired,
    HelixArray: PropTypes.array.isRequired,
    TimeStart: PropTypes.string.isRequired,
    TimeEnd: PropTypes.string.isRequired,
    TimeElap: PropTypes.number.isRequired,
    FilePath: PropTypes.string.isRequired,
    ServerError: PropTypes.bool.isRequired,
  };

  render() {
    const BannerMsg = {
      "loading":
      {
        "type": "info",
        "msg": `Please be patient, we are processing your calculation request. The calculation may take up to ${this.props.EstTime}.`,
      },
      "loaded":
      {
        "type": "success",
        "msg": "The calculation is done!",
      }
    };

    const FileLink = `${HTTPconfig.gateway}${this.props.FilePath}`;

    if (
      this.props.RelExtArray[0] === "NaN detected" ||
      this.props.HelixArray[0] === "NaN detected"
    ) {
      return (
        <Alert
          message="Error with computed extension"
          description="Please make sure your polymer segment length and persistence length are set to meaningful values"
          type="error"
          banner
        />
      )
    }

    return (
      <React.Fragment>
      {this.props.ServerError ? (
        <Alert
          message="We are having some problems with the server"
          description="Please try again later"
          type="warning"
          banner
        />
      )
      : (
        <React.Fragment>
          <Alert
            type={this.props.Loading
              ? BannerMsg["loading"].type
              : BannerMsg["loaded"].type}
            banner
            message={this.props.Loading
              ? BannerMsg["loading"].msg
              : BannerMsg["loaded"].msg}
          />

          <br />

          <Card
            title={this.props.Loading
              ? (
                <Badge
                  status="processing"
                  text="Waiting for Results"
                />)
              : "Export Results"}
            style={{
              width: "100%",
            }}
          >
            <Spin indicator={antIcon} spinning={this.props.Loading}>
              Calculation received @: {this.props.TimeStart}
              <br />
              Calculation finished @: {this.props.TimeEnd}
              <br />
              <b>Time taken: {this.props.TimeElap}s</b>
              <br />
              <Divider />
              <a href={FileLink}>
              <Button>
                <Icon type="download" /> Download
              </Button>
              </a>
            </Spin>
          </Card>

          <br />

          <InputSummary />

          <Divider />

          <VisGraph
            dataLoading={this.props.Loading}
            dataExtArray={this.props.RelExtArray}
            dataHelArray={this.props.HelixArray}
          />

          <Divider />

        </React.Fragment>
      )}
      </React.Fragment>
    );
  }
}
export default ResultPlot;
