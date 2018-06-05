import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

class SliderInput extends React.Component {
  state = {
    sliderLength: this.props.inputValue,
  }

  onChangeValue = (value) => {
    // validate inputs are only integers
    const onlyInt = /^[0-9]+$/;
    if (onlyInt.test(value)) {
      this.setState({
        sliderLength: value,
      });
    }
  }

  render() {
    return (
      <Row>
        <Col span={18}>
          <Slider
            min={1}
            max={9999}
            onChange={this.onChangeValue}
            value={this.state.sliderLength}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={9999}
            step={1}
            style={{ marginLeft: 16 }}
            onChange={this.onChangeValue}
            value={this.state.sliderLength}
          />
        </Col>
      </Row>
    );
  }
}

export default SliderInput;
