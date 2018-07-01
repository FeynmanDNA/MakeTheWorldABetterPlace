import React from 'react';
import { Form, Tooltip, Icon } from 'antd';
import SliderInput from './SliderInput';

const FormItem = Form.Item;

class DNALengthRow extends React.Component {

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
    );
  }
}

export default DNALengthRow;
