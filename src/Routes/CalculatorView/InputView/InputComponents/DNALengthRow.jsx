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

    const DynamicLabel = this.props.isPolymer
      ? (
        <span>
          Polymer Length&nbsp;(nm)&nbsp;
          <Tooltip title="Polymer length is the contour length in nm.">
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      )
      : (
        <span>
          DNA Length&nbsp;(nm)&nbsp;
          <Tooltip title="DNA length is the contour length in B-DNA state in nm.">
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      )

    return (
      <FormItem
        {...formItemLayout}
        label={DynamicLabel}
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
