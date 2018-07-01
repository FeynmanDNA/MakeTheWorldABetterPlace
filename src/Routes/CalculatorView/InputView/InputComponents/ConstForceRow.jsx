import React from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, Icon } from 'antd';
import SliderInput from './SliderInput';

const FormItem = Form.Item;

class ConstForceRow extends React.Component {
  static propTypes = {
    AllowB2S: PropTypes.bool.isRequired,
  }

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
            Force&nbsp;(pN)&nbsp;
            <Tooltip
              title={this.props.AllowB2S
                ? "Force exerted between 0-200pN"
                : "Force exerted between 0-31pN"
              }
            >
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        )}
      >
        <SliderInput
          idValue="ConstForce"
          onlyCheckIntNum={false}
          inputValue={10}
          minValue={0.01}
          maxValue={this.props.AllowB2S ? 200 : 31}
          stepValue={0.01}
          toFixedNum={2}
          SliderStep={0.01}
        />
      </FormItem>
    );
  }
}

export default ConstForceRow;
