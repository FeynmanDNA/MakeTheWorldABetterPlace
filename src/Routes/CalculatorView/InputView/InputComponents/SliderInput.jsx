import React from 'react';
import PropTypes from 'prop-types';
import { Slider, InputNumber, Row, Col } from 'antd';

class SliderInput extends React.Component {
  static propTypes = {
    idValue: PropTypes.string.isRequired,
    onlyCheckIntNum: PropTypes.bool.isRequired,
    inputValue: PropTypes.number.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    stepValue: PropTypes.number.isRequired,
    marksValue: PropTypes.object,
    toFixedNum: PropTypes.number,
    SliderStep: PropTypes.number,
    isPolymer: PropTypes.bool
  };

  state = {
    sliderLength: this.props.inputValue,
  };

  onChangeSliderValue = (value) => {
    this.setState({
      sliderLength: value,
    });
  }

  // DNALength and MaxMode only check for integers
  // Single Force, Torque, ProteinE, insertLength check for float
  onChangeInputValue = (value) => {
    if (this.props.onlyCheckIntNum) {
      // validate inputs are only integers
      const onlyInt = /^[0-9]+$/;
      if (onlyInt.test(value)) {
        this.setState({
          sliderLength: value,
        });
      }
    } else {
      // validate inputs are signed and float numbers
      const onlyNum = /^-?\d+\.?\d*$/;
      if (onlyNum.test(value)) {
        // when user is in the middle keying dot
        // do not set state
        if (typeof(value) === "string") {
          return;
        }
        value = +(value).toFixed(this.props.toFixedNum);
        this.setState({
          sliderLength: value,
        });
      }
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
            step={this.props.SliderStep}
            disabled={this.props.isPolymer}
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
            disabled={this.props.isPolymer}
          />
        </Col>
      </Row>
    );
  }
}

export default SliderInput;
