import React from 'react';
import PropTypes from 'prop-types';

import InputSummary from './InputSummary';

// get current states from global_store
import { inject, observer } from 'mobx-react';
import { Alert, Spin, Divider, Card, Button, Icon } from 'antd';

const BannerMsg = {
  "loading":
  {
    "type": "info",
    "msg": "Please be patient, we are processing your calculation request. The calculation may take up to 5 minutes.",
  },
  "loaded":
  {
    "type": "success",
    "msg": "The calculation is done!",
  }
};

@inject('global_store')
@observer
class ResultPlot extends React.Component {
  static propTypes = {
    Loading: PropTypes.bool.isRequired,
  };

  render() {
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

        <Spin spinning={this.props.Loading}>
          <h1>this.state.forceArray</h1>
        </Spin>
        <Spin spinning={this.props.Loading}>
          {this.props.Loading
            ? <p>Loading...</p>
            : <p>Loaded</p>}
        </Spin>

        <Divider />

        <Card
          title="Export Results"
          style={{
            width: "100%",
          }}
        >
          <Spin />
          <Button>
            <Icon type="download" /> Download
          </Button>
        </Card>
        <br />
      </React.Fragment>
    );
  }
}
export default ResultPlot;
