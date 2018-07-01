import React from 'react';
import { Form, Tooltip, Icon } from 'antd';
import SliderInput from './SliderInput';

const FormItem = Form.Item;

class ProteinERow extends React.Component {

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
            Protein Energy&nbsp;(kB*T)&nbsp;
            <Tooltip title="Protein(histone octamers) binding energy to DNA in [k_B*T] units">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        )}
      >
        <SliderInput
          idValue="ProteinE"
          onlyCheckIntNum={false}
          marksValue={{
            40:"default",
          }}
          inputValue={40}
          minValue={-20}
          maxValue={100}
          stepValue={0.1}
          toFixedNum={1}
          SliderStep={0.1}
        />
      </FormItem>
    );
  }
}

export default ProteinERow;
