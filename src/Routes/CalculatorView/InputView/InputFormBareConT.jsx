import React from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, Icon, Card } from 'antd';
import SliderInput from './SliderInput';
import SliderInputRange from './SliderInputRange';
import AdvBDNAParam from './AdvBDNAParam';
// access the global_store to modify the SubmitBtnStatus
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;

@inject('global_store')
@observer
class InputFormBareConT extends React.Component {
  static propTypes = {
  };

  state = {
    ArrayDisplay: [],
    validateStep: 'success',
    errorStep: '',
  }

  componentDidMount() {
    let ArrayRange = [];
    const step = parseFloat(document.getElementById("StepSize").value);
    let start = parseFloat(document.getElementById("RangeStart").value);
    const end = parseFloat(document.getElementById("RangeEnd").value);
    while (start<=end) {
      ArrayRange.push(start);
      start = +(start+step).toFixed(2);
    }
    this.setState({
      ArrayDisplay: ArrayRange,
    });
  };

  componentWillUnmount() {
    // when unmount, push the form value and ArrayDisplay to mobx state
    this.props.global_store.SubmitBareConT(this.state.ArrayDisplay);

  }

  // for torque array, the step size is 0.1
  // for force array, the step size is 0.01
  validateArrayLength = (value) => {
    let ArrayRange = [];
    let [ start, end ] = value.sliderValue;
    const step = value.StepSize;
    if (step===0) {
      this.setState({
        validateStep: 'error',
        errorStep: "step should not be zero",
      });
      // disable submit button if validation fails
      this.props.global_store.SubmitBtnStatus(false);
    } else if (typeof step === "string") {
      this.setState({
        validateStep: 'error',
        errorStep: "step should be number",
      });
      // disable submit button if validation fails
      this.props.global_store.SubmitBtnStatus(false);
    } else if ( ((end-start)/step +1) > 100 ) {
      this.setState({
        validateStep: 'error',
        errorStep: "please limit the Array to no more than 100 items"
      });
      // disable submit button if validation fails
      this.props.global_store.SubmitBtnStatus(false);
    } else {
      this.setState({
        validateStep: 'success',
        errorStep: '',
      });
      this.props.global_store.SubmitBtnStatus(true);
    }
    if (this.state.validateStep === 'success') {
      while (start <= end) {
        ArrayRange.push(start);
        start = +(start + step).toFixed(2);
        // Note the plus sign that drops any "extra" zeroes at the end.
        // It changes the result (which is a string) into a number again (think "0 + foo"),
      }
      this.setState({
        ArrayDisplay: ArrayRange,
      });
    }
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              DNA Length&nbsp;(nm)&nbsp;
              <Tooltip title="DNA length is the contour length in B-DNA state in nm.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          <SliderInput
            idValue="DNALength"
            onlyCheckIntNum={true}
            inputValue={1000}
            minValue={1}
            maxValue={9999}
            stepValue={1}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          validateStatus={this.state.validateStep}
          help={this.state.errorStep}
          label={(
            <span>
              Force&nbsp;(pN)&nbsp;
              <Tooltip title="Force exerted between 0-200pN">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          <SliderInputRange
            inputValue={[0.03, 1.02]}
            minValue={0}
            maxValue={200}
            marksValue={{31:'31'}}
            stepValue={0.01}
            toFixedNum={2}
            validateRange={(value) => this.validateArrayLength(value)}
          />
        </FormItem>
        <Tooltip title="Adjust the slider range, or key in Range from, to, and Step size above to generate the array you want.">
          <Icon type="question-circle-o" />
        </Tooltip>
        <Card title={`Force Array of ${this.state.ArrayDisplay.length} elements:`}>
          {this.state.ArrayDisplay.map( (value, index) => {
            return (
              <Card.Grid
                key={index}
                style={{
                  padding:3,
                  width: "10%",
                  textAlign:'left'
                }}
              >
                <small>{value}</small>
              </Card.Grid>
            );
          })}
        </Card>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Torque&nbsp;(pN*nm)&nbsp;
              <Tooltip title="Torque between -30 to +50 pN*nm">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          <SliderInput
            idValue="ConstTorque"
            onlyCheckIntNum={false}
            marksValue={{
              0:"0",
            }}
            inputValue={-10}
            minValue={-30}
            maxValue={50}
            stepValue={0.1}
            toFixedNum={1}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Max Mode&nbsp;
              <Tooltip title="number of modes taken into account in the transfer matrix calculations">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          <SliderInput
            idValue="MaxMode"
            onlyCheckIntNum={true}
            marksValue={{
              10:"", 11:"", 12:"", 13:"", 14:"default",
              15:"", 16:"", 17:"", 18:"", 19:"", 20:""
            }}
            inputValue={14}
            minValue={10}
            maxValue={20}
            stepValue={1}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              <small>Advanced parameters&nbsp;</small>
              <Tooltip title="Advanced parameters can be left to defaults">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          <AdvBDNAParam />
        </FormItem>
      </Form>
    );
  }
}

export default InputFormBareConT;
