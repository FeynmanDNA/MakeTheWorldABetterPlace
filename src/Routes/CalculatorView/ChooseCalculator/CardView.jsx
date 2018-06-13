import React from 'react';
import '../calculator.css';
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
          style={{
            width: "auto",
            maxHeight: "100%",
          }}
          src={this.props.imgsrc}
        />,
      info:
        this.props.info,
    };

    return (
      <Card
        style={{
          cursor:"default",
          height:480,
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
        <div className="CardContentList">
          {contentList[this.state.key]}
        </div>
        <Button
          onClick={this.props.handleClick}
        >
          Select
        </Button>
      </Card>
    );
  }
}

export default CardView;
