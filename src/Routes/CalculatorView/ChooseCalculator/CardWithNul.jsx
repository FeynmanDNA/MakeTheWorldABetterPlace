import React from 'react';
import { Button, Icon, Card } from 'antd';

class CardWithNul extends React.Component {
  render() {
    return (
      <Card
        style={{cursor:"default"}}
        title="With Nucleosome"
        hoverable
      >
        <Button>Select</Button>
      </Card>
    );
  }
}

export default CardWithNul;
