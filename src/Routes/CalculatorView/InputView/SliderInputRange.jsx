import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

class SliderInput extends React.Component {
  state = {
    sliderValue: [-10,10],
  }

  onChangeSliderValue = (value) => {
    this.setState({
      sliderValue: value,
    });
  }

  onChangeInputValue0 = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      this.setState((prevState) => ({
        sliderValue: [value, prevState.sliderValue[1]], 
      }));
    }
  }

  onChangeInputValue1 = (value) => {
    // validate inputs are signed and float numbers
    const onlyNum = /^-?\d+\.?\d*$/;
    if (onlyNum.test(value)) {
      this.setState((prevState) => ({
        sliderValue: [prevState.sliderValue[0], value],
      }));
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={22}>
            <Slider
              range
              min={-30}
              max={50}
              marks={{0:'0'}}
              onChange={this.onChangeSliderValue}
              value={this.state.sliderValue}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            Range from:
            <InputNumber
              id="RangeStart"
              size="small"
              min={-30}
              max={50}
              step={0.01}
              style={{ marginLeft: 16 }}
              onChange={this.onChangeInputValue0}
              value={this.state.sliderValue[0]}
            />
          </Col>
          <Col span={12}>
            To:
            <InputNumber
              id="RangeEnd"
              size="small"
              min={-30}
              max={50}
              step={0.01}
              style={{ marginLeft: 16 }}
              onChange={this.onChangeInputValue1}
              value={this.state.sliderValue[1]}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SliderInput;
