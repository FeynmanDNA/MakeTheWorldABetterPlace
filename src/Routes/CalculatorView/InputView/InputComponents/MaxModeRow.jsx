import React from 'react';
import { Form, Tooltip, Icon } from 'antd';
import SliderInput from './SliderInput';

const FormItem = Form.Item;

class MaxModeRow extends React.Component {

  render() {
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
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
    );
  }
}

export default MaxModeRow;
