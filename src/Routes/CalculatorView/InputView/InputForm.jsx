import React from 'react';
import { Form, Tooltip, Icon } from 'antd';
import SliderInput from './SliderInput';
import SliderInputConstForce from './SliderInputConstForce';

const FormItem = Form.Item;

class InputForm extends React.Component {
  state = {
    validateForce: null,
    errorForce: null,
  }

  validateZero = (number) => {
    console.log(number);
    if (number === 0) {
      this.setState({
        validateForce: 'error',
        errorForce: 'force cannot be 0',
      });
    } else {
      this.setState({
        validateForce: 'success',
        errorForce: null,
      });
    }
    console.log(this.state);
  }

  handleSubmit = () => {
    console.log("look here!", document.getElementById("DNALength").value);
    console.log(document.getElementById("ConstForce").value);
    console.log(document.getElementById("MaxMode").value);
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
          validateStatus={this.state.validateForce}
          help={this.state.errorForce}
          label={(
            <span>
              Force&nbsp;(pN)&nbsp;
              <Tooltip title="Force exerted between 0-200pN">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          <SliderInputConstForce
            idValue="ConstForce"
            inputValue={10}
            minValue={0}
            maxValue={200}
            stepValue={0.01}
            validateForce={(value) => this.validateZero(value)}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Input3Here&nbsp;(nm)&nbsp;
              <Tooltip title="Input3">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          <SliderInput
            inputValue={1000}
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
        <button onClick={this.handleSubmit}>Submit</button>
      </Form>
    );
  }
}

export default InputForm;
