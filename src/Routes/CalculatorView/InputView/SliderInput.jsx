import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

class SliderInput extends React.Component {
  state = {
    sliderLength: this.props.inputValue,
  }

  onChangeSliderValue = (value) => {
    this.setState({
      sliderLength: value,
    });
  }

  onChangeInputValue = (value) => {
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

export default SliderInput;
