import React from 'react';
import { Card, Timeline, Tag } from 'antd';

class ChangeLogCard extends React.Component {
  render() {
    return (
      <Card
        title="Changelog"
        bordered={false}
        style={{
          width: 900,
          marginLeft: 170,
        }}
        extra={<a id="Changelog">.</a>}
      >
      <Timeline>
        <Timeline.Item>
          <Tag style={{cursor: "default"}} color="green">
            2018 Jul 13th
          </Tag>
          Version 3.1: Launched on an inhouse Xeon server, calculation time reduced to less than 30 seconds
        </Timeline.Item>
        <Timeline.Item>
          <Tag style={{cursor: "default"}} color="green">
            2018 Jul 11th
          </Tag>
          Version 3: New webapp with React/Mobx/React-vis for frontend ready for internal testing
        </Timeline.Item>
        <Timeline.Item>
          <Tag style={{cursor: "default"}} color="purple">
            2018 Apr 23rd
          </Tag>
          Version 2.1: DNA-nucleosome calculator online
        </Timeline.Item>
        <Timeline.Item>
          <Tag style={{cursor: "default"}} color="purple">
            2018 Feb 26th  
          </Tag>
          Verion 2: force can now be an array of 20 values for parallel iteration, and new force-extension curve plot with jQuery Flot
        </Timeline.Item>
        <Timeline.Item>
          <Tag style={{cursor: "default"}} color="geekblue">
            2018 Feb 23rd 
          </Tag>
          Version 1.2: introduction of new bare DNA states, now S-DNA is included in the transfer-matrix calculations, increasing the program working range to ~ 0-200 pN, program now outputs the DNA superhelical density instead of the linking number
        </Timeline.Item>
        <Timeline.Item>
          <Tag style={{cursor: "default"}} color="geekblue">
            2018 Feb 15th
          </Tag>
          Version 1.1: with C++ calculator online.
        </Timeline.Item>
        <Timeline.Item>
          <Tag style={{cursor: "default"}} color="geekblue">
            2018 Feb 12th
          </Tag>
          First version with Octave calculator online.
        </Timeline.Item>
      </Timeline>
      </Card>
    );
  }
}

export default ChangeLogCard;
