import React from 'react';
import { Card } from 'antd';


class CardView extends React.Component {
  render() {
    return (
      <Card
        style={{
          cursor:"pointer",
          height:310,
          width: 380,
          padding: 0
        }}
        title={this.props.title}
        onClick={this.props.handleClick}
        hoverable
      >
        <Card.Grid
          style={{
            width: "43%",
            padding:5
          }}
        >
        <img
          alt="whatever"
          style={{
            width: "150px"
          }}
          src={this.props.imgsrc}
        />
        </Card.Grid>
        <Card.Grid
          style={{
            width: '57%',
            textAlign: 'center',
          }}
        >
          {this.props.info}
        </Card.Grid>
      </Card>
    );
  }
}

export default CardView;
