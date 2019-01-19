import React from 'react';
import { Card } from 'antd';

class CardView extends React.Component {
  render() {
    return (
      <Card
        style={{
          cursor:"pointer",
          height:385,
          width: 380,
          padding: 0
        }}
        title={this.props.title}
        onClick={this.props.handleClick}
        hoverable
      >
        <Card.Grid
          style={{
            width: "100%",
            padding:5,
            height: 240
          }}
        >
          <img
            alt="whatever"
            style={{
              width: "310px"
            }}
            src={this.props.imgsrc}
          />
        </Card.Grid>
        <div style={{ padding: 10}}>
          {this.props.info}
        </div>
      </Card>
    );
  }
}

export default CardView;
