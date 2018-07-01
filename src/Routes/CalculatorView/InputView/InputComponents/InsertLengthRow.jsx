import React from 'react';
import { Form, Tooltip, Icon } from 'antd';
import SliderInput from './SliderInput';

const FormItem = Form.Item;

class InsertLengthRow extends React.Component {

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
            Insert Length&nbsp;(%)&nbsp;
            <Tooltip title="Insert Length in % of the DNA Length">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        )}
      >
        <SliderInput
          idValue="InsertLength"
          onlyCheckIntNum={false}
          inputValue={10}
          minValue={0.1}
          maxValue={100}
          stepValue={0.1}
          toFixedNum={1}
          SliderStep={0.1}
        />
      </FormItem>
    );
  }
}

export default InsertLengthRow;
