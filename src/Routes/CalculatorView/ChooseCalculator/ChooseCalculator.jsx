import React from 'react';
// get current step from global_store
import { inject, observer } from 'mobx-react';
import { Card, Col, Row } from 'antd';

@inject('global_store')
@observer
class ChooseCalculator extends React.Component {
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Bare DNA"
              bordered={false}
              hoverable
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="With Nucleosome"
              bordered={false}
              hoverable
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="3rd type"
              bordered={false}
              hoverable
            >
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChooseCalculator;
