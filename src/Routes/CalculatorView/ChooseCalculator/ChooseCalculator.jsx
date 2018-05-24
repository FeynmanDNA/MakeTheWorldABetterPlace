import React from 'react';
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

  handleClick = () => {
    this.props.global_store.chooseMode("Mode1");
  }

  testHistory = () => {
    this.props.history.push('/calculator/'+1+'/choosemode');
  }

  clearStore = () => {
    this.props.global_store.clearState();
    this.props.history.push('/calculator/choosecalculator');
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Bare DNA"
              bordered={false}
              hoverable
              onClick={this.handleClick}
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="With Nucleosome"
              bordered={false}
              hoverable
              onClick={this.testHistory}
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="3rd type"
              bordered={false}
              hoverable
              onClick = {this.clearStore}
            >
              Card content
            </Card>
          </Col>
        </Row>
    <ButtonGroup>
      <Button type="primary" disabled={this.props.global_store.mode ? false : true}>
        <Icon type="left" />Go back
      </Button>
      <Button type="primary">
        Go forward<Icon type="right" />
      </Button>
    </ButtonGroup>
      </div>
    );
  }
}

export default ChooseCalculator;
