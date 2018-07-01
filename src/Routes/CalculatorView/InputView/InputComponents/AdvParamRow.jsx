import React from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, Icon } from 'antd';
import AdvBDNAParam from './AdvBDNAParam';
import AdvInsertParam from './AdvInsertParam';

const FormItem = Form.Item;

class MaxModeRow extends React.Component {
  static propTypes = {
    forWithIns: PropTypes.bool.isRequired,
  };

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
            <small>Advanced parameters&nbsp;</small>
            <Tooltip title="Advanced parameters can be left to defaults">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        )}
      >
        {this.props.forWithIns
          ? (
            <AdvInsertParam />
          )
          : (
            <AdvBDNAParam />
          )
        }
      </FormItem>
    );
  }
}

export default MaxModeRow;
