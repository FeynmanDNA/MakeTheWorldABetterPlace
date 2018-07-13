import React from 'react';
import { Card, Tooltip } from 'antd';

class TitleCard extends React.Component {
  render() {
    return (
      <Card
        title={<h2>Yan Jie Group's Calculator Web-app</h2>}
        bordered={false}
        style={{
          width: 900,
          marginLeft: 170,
        }}
        extra={<a id="Title">.</a>}
      >
        <p>An online calculator that calculates the DNA extension, linking number change, and structural state of DNA under given force and torque constraints, with DNA interactions with protein complexes and other DNA-inserts.</p>
        <p>Brought to you by <Tooltip title="YJG website"><a href="https://www.physics.nus.edu.sg/~biosmm/" target="_blank" rel="noopener noreferrer">Yan Jie's research group</a></Tooltip> @ National University of Singapore</p>
      </Card>
    );
  }
}

export default TitleCard;
