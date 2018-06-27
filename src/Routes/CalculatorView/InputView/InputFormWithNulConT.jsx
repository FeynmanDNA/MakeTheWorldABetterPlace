import React from 'react';
import { Form, Tooltip, Icon, Card } from 'antd';
import SliderInput from './SliderInput';
import SliderInputConstTorque from './SliderInputConstTorque';
import SliderInputRange from './SliderInputRange';
import SliderInputProteinE from './SliderInputProteinE';

const FormItem = Form.Item;

class InputFormWithNulConT extends React.Component {
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
  }

  validateZero = (number) => {
    if (number === 0) {
      this.setState({
        validateForce: 'error',
        errorForce: 'force cannot be 0',
      });
    } else {
      this.setState({
        validateForce: 'success',
        errorForce: '',
      });
    }
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
    } else if (typeof step === "string") {
      this.setState({
        validateStep: 'error',
        errorStep: "step should be number",
      });
    } else if ( ((end-start)/step +1) >= 100 ) {
      this.setState({
        validateStep: 'error',
        errorStep: "please limit the Array to no more than 100 items"
      });
    } else if (start === 0 || end === 0) {
      this.setState({
        validateStep: "error",
        errorStep: "Force cannot be zero"
      });
    } else if (start === 31 || end === 31) {
      this.setState({
        validateStep: "error",
        errorStep: "Force cannot be more than 31pN"
      });
    } else {
      this.setState({
        validateStep: 'success',
        errorStep: '',
      });
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
            maxValue={31}
            stepValue={0.01}
            validateRange={(value) => this.validateArrayLength(value)}
          />
          <Card title={`Force Array of ${this.state.ArrayDisplay.length}`}>
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
        </FormItem>
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
          <SliderInputConstTorque
            idValue="ConstTorque"
            marksValue={{
              0:"0",
            }}
            inputValue={-10}
            minValue={-30}
            maxValue={50}
            stepValue={0.1}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Protein Energy&nbsp;(kB*T)&nbsp;
              <Tooltip title="binding energy of histone octamers to DNA in kB*T">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          <SliderInputProteinE
            idValue="ProteinE"
            marksValue={{
              0:"0",
            }}
            inputValue={40}
            minValue={-20}
            maxValue={100}
            stepValue={1}
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
      </Form>
    );
  }
}

export default InputFormWithNulConT;