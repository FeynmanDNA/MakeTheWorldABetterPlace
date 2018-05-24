import React from 'react';
import { Button, Icon, Card } from 'antd';

class CardWithIns extends React.Component {
  render() {
    return (
      <Card
        style={{cursor:"default"}}
        title="With DNA-insert"
        hoverable
      >
        <Button>Select</Button>
      </Card>
    );
  }
}

export default CardWithIns;
