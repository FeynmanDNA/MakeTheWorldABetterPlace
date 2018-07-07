import React from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, Icon, Card } from 'antd';
// SliderInputRange for Force or Torque Array
import SliderInputRange from './InputComponents/SliderInputRange';
// Custom Components for each row entry
import DNALengthRow from './InputComponents/DNALengthRow';
import InsertLengthRow from './InputComponents/InsertLengthRow';
import ConstForceRow from './InputComponents/ConstForceRow';
import ConstTorqueRow from './InputComponents/ConstTorqueRow';
import ProteinERow from './InputComponents/ProteinERow';
import MaxModeRow from './InputComponents/MaxModeRow';
import AdvParamRow from './InputComponents/AdvParamRow';
// access the global_store to modify the SubmitBtnStatus
import { inject, observer } from 'mobx-react';

const FormItem = Form.Item;

@inject('global_store')
@observer
class InputForm extends React.Component {
  static propTypes = {
    calType: PropTypes.string.isRequired,
    calMode: PropTypes.string.isRequired,
  };

  state = {
    ArrayDisplay: [],
    validateStep: 'success',
    errorStep: '',
  };

  async componentDidMount() {
    // clear the global_store's FormInputs so the browser has no confusion
    await this.props.global_store.clearForm();
    let ArrayRange = [];
    const step = parseFloat(document.getElementById("StepSize").value);
    let start = parseFloat(document.getElementById("RangeStart").value);
    const end = parseFloat(document.getElementById("RangeEnd").value);
    while (start<=end) {
      ArrayRange.push(start);
      start = +(start+step).toFixed(2);
    }
    await this.setState({
      ArrayDisplay: ArrayRange,
    });
  }

  componentWillUnmount() {
    // when unmount, push the form value and ArrayDisplay to mobx state
    this.props.global_store.SubmitInputForm(
      this.props.global_store.calculator,
      this.props.global_store.mode,
      this.state.ArrayDisplay
    );
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

    let ForceArrayTitle = `Force Array of ${this.state.ArrayDisplay.length} elements:`;
    let TorqueArrayTitle = `Torque Array of ${this.state.ArrayDisplay.length} elements:`;

    return (
      <Form>
        <DNALengthRow />
        {this.props.calType === "With DNA-insert" &&
          <InsertLengthRow />
        }
        {this.props.calMode === "Constant Torque"
          ? (
          <React.Fragment>
            <FormItem
              {...formItemLayout}
              validateStatus={this.state.validateStep}
              help={this.state.errorStep}
              label={(
                <span>
                  Force&nbsp;(pN)&nbsp;
                  <Tooltip
                    title={this.props.calType === "With Nucleosome"
                      ? "Force exerted between 0-31pN"
                      : "Force exerted between 0-200pN"
                    }
                  >
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              <SliderInputRange
                inputValue={[0.03, 1.02]}
                minValue={0.01}
                maxValue={
                  this.props.calType === "With Nucleosome"
                  ? 31
                  : 200}
                marksValue={{31:'31'}}
                stepValue={0.01}
                toFixedNum={2}
                validateRange={(value) => this.validateArrayLength(value)}
                SliderStep={0.01}
              />
            </FormItem>
            <Tooltip title="Adjust the slider range, or key in Range from, to, and Step size above to generate the array you want.">
              <Icon type="question-circle-o" />
            </Tooltip>
            <Card title={ForceArrayTitle}>
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
            <ConstTorqueRow />
          </React.Fragment>
          )
          : (
          <React.Fragment>
            <ConstForceRow
              AllowB2S={
                this.props.calType === "With Nucleosome"
                 ? false
                 : true
              }
            />
            <FormItem
              {...formItemLayout}
              validateStatus={this.state.validateStep}
              help={this.state.errorStep}
              label={(
                <span>
                  Torque&nbsp;(pN*nm)&nbsp;
                  <Tooltip title="Torque between -30 to +50 pN*nm">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              <SliderInputRange
                inputValue={[-4.9, 5]}
                minValue={-30}
                maxValue={50}
                marksValue={{0:'0'}}
                stepValue={0.1}
                toFixedNum={1}
                validateRange={(value) => this.validateArrayLength(value)}
                SliderStep={0.1}
              />
            </FormItem>
            <Tooltip title="Adjust the slider range, or key in Range from, to, and Step size above to generate the array you want.">
              <Icon type="question-circle-o" />
            </Tooltip>
            <Card title={TorqueArrayTitle}>
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
          </React.Fragment>
          )
        }
        {this.props.calType === "With Nucleosome" &&
          <ProteinERow />
        }
        <MaxModeRow />
        {this.props.calType === "Bare DNA" &&
          <AdvParamRow forWithIns={false} />
        }
        {this.props.calType === "With DNA-insert" &&
          <AdvParamRow forWithIns={true} />
        }
      </Form>
    );
  }
}

export default InputForm;
