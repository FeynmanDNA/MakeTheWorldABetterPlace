import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

class SliderInput extends React.Component {
  state = {
    sliderValue: this.props.inputValue,
    StepSize: this.props.stepValue,
  }

  onChangeSliderValue = async (value) => {
    await this.setState({
      sliderValue: value,
    });
    this.props.validateRange({...this.state});
  }

  onChangeInputValue0 = async (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      if (value>this.state.sliderValue[1]) {
        return;
      }
      await this.setState((prevState) => ({
        sliderValue: [value, prevState.sliderValue[1]], 
      }));
      this.props.validateRange({...this.state});
    }
  }

  onChangeInputValue1 = async (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      if (value<this.state.sliderValue[0]) {
        return;
      }
      await this.setState((prevState) => ({
        sliderValue: [prevState.sliderValue[0], value],
      }));
      this.props.validateRange({...this.state});
    }
  }

  onChangeStepSize = async (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      await this.setState({
        StepSize: value,
      });
      this.props.validateRange({...this.state});
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={22}>
            <Slider
              range
              min={this.props.minValue}
              max={this.props.maxValue}
              marks={this.props.marksValue}
              onChange={this.onChangeSliderValue}
              value={this.state.sliderValue}
            />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            Range from:
          </Col>
          <Col span={8}>
            to:
          </Col>
          <Col span={8}>
            Step size:
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <InputNumber
              id="RangeStart"
              size="small"
              min={this.props.minValue}
              max={this.props.maxValue}
              step={this.props.stepValue}
              onChange={this.onChangeInputValue0}
              value={this.state.sliderValue[0]}
            />
          </Col>
          <Col span={8}>
            <InputNumber
              id="RangeEnd"
              size="small"
              min={this.props.minValue}
              max={this.props.maxValue}
              step={this.props.stepValue}
              onChange={this.onChangeInputValue1}
              value={this.state.sliderValue[1]}
            />
          </Col>
          <Col span={8}>
            <InputNumber
              id="StepSize"
              size="small"
              min={this.props.stepValue}
              defaultValue={this.props.stepValue}
              step={this.props.stepValue}
              onChange={this.onChangeStepSize}
              value={this.state.StepSize}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SliderInput;
