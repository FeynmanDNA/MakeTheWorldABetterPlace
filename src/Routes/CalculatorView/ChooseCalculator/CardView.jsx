import React from 'react';
import { Button, Icon, Card } from 'antd';

class CardView extends React.Component {
  state = {
    key: 'pin',
  }

  componentDidMount() {
    this.setState({
      key: 'pin',
    });
  }

  onTabChange = (key, type) => {
    this.setState({
      [type]: key,
    });
  }

  render() {
    const tabList = [{
      key: 'pin',
      tab: <Icon type="pushpin-o" />,
    }, {
      key: 'info',
      tab: <Icon type="question-circle-o" />,
    }];
    const contentList = {
      pin:
        <img
          alt="whatever"
          src={this.props.imgsrc}
          style={{width: 150}}
        />,
      info:
        this.props.info,
    };

    return (
      <Card
        style={{
          cursor:"default",
          height:380
        }}
        title={this.props.title}
        tabList={tabList}
        onTabChange={
          (key) => {
            this.onTabChange(key, 'key');
          }
        }
        hoverable
      >
        <div style={{
          fontSize:12,
          height: 212,
        }}>
          {contentList[this.state.key]}
        </div>
        <Button onClick={this.props.handleClick}>Select</Button>
      </Card>
    );
  }
}

export default CardView;
