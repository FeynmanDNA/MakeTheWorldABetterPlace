import React from 'react';
import { Button, Icon, Card } from 'antd';

class CardBareDNA extends React.Component {
  render() {
    return (
      <Card
        style={{cursor:"default"}}
        title="Bare DNA"
        hoverable
      >
Bare DNA version of the program calculates the conformation of bare DNA under force and torque constraints. In the calculations, DNA is allowed to transit between 4 DNA structural states: B-, L-, P- and S-DNA.
      <br />
      <br />
      <Button>Select</Button>
      </Card>
    );
  }
}

export default CardBareDNA;
