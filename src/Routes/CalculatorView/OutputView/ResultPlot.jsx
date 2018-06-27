import React from 'react';
import PropTypes from 'prop-types';

import InputSummary from './InputSummary';
import VisGraph from './VisGraph';

// get current states from global_store
import { inject, observer } from 'mobx-react';
import { Alert, Spin, Divider, Card, Button, Icon, Badge } from 'antd';



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

    return (
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

        <InputSummary />

        <Divider />

        <VisGraph
          dataLoading={this.props.Loading}
        />

        <Divider />

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
          <Spin spinning={this.props.Loading}>
            <Button>
              <Icon type="download" /> Download
            </Button>
          </Spin>
        </Card>
        <br />
      </React.Fragment>
    );
  }
}
export default ResultPlot;
