import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

class SliderInputConstForce extends React.Component {
  state = {
    sliderLength: this.props.inputValue,
  }

  onChangeSliderValue = async (value) => {
    await this.setState({
      sliderLength: value,
    });
    this.props.validateForce(value);
  }

  onChangeInputValue = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      this.setState({
        sliderLength: value,
      });
    }
    this.props.validateForce(value);
  }

  render() {
    return (
      <Row>
        <Col span={18}>
          <Slider
            min={this.props.minValue}
            max={this.props.maxValue}
            marks={this.props.marksValue}
            onChange={this.onChangeSliderValue}
            value={this.state.sliderLength}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            id={this.props.idValue}
            min={this.props.minValue}
            max={this.props.maxValue}
            step={this.props.stepValue}
            style={{ marginLeft: 16 }}
            onChange={this.onChangeInputValue}
            value={this.state.sliderLength}
          />
        </Col>
      </Row>
    );
  }
}

export default SliderInputConstForce;
