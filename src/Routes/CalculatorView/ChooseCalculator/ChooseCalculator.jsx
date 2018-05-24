import React from 'react';
import CardBareDNA from './CardBareDNA';
import CardWithNul from './CardWithNul';
import CardWithIns from './CardWithIns';
// get current step from global_store
// and to manage global states
import { inject, observer } from 'mobx-react';
import { Button, Icon, Card, Col, Row } from 'antd';

const ButtonGroup = Button.Group;

@inject('global_store')
@observer
class ChooseCalculator extends React.Component {
  componentDidMount() {
    this.props.global_store.switchStep(0);
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="space-around">
          <Col span={7}>
            <CardBareDNA />
          </Col>
          <Col span={7}>
            <CardWithNul />
          </Col>
          <Col span={7}>
            <CardWithIns />
          </Col>
        </Row>
      <br />
      <br />
      <br />
        <ButtonGroup>
          <Button
            type="primary"
            disabled>
            <Icon type="left" />
            Go back
          </Button>
          <Button
            type="primary"
            disabled={this.props.global_store.mode
              ? false
              : true}>
            Go forward
            <Icon type="right" />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default ChooseCalculator;
