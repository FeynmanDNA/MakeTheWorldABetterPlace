import React from 'react';
import { Form, Tooltip, Icon } from 'antd';
import SliderInput from './SliderInput';

const FormItem = Form.Item;

class ConstTorqueRow extends React.Component {

  render() {
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      this.props.isPolymer
        ? (
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Torque&nbsp;(pN*nm)&nbsp;
                <Tooltip title="Torque is zero for Polymer calculation">
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
              inputValue={0}
              minValue={-30}
              maxValue={50}
              stepValue={0.1}
              toFixedNum={1}
              SliderStep={0.1}
              isPolymer={this.props.isPolymer}
            />
          </FormItem>
        )
        : (
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
              SliderStep={0.1}
            />
          </FormItem>
        )
    );
  }
}

export default ConstTorqueRow;
