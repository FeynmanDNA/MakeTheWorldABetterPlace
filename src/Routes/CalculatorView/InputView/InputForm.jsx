import React from 'react';
// antd form
import { Form, Icon } from 'antd';

const FormItem = Form.Item;

class InputForm extends React.Component {
  state = {
    expand: false,
  };

  toggleAdvancedParams = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {
    return (
      <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggleAdvancedParams}>
        Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
      </a>
    );
  }
}

const WrapperInputForm = Form.create()(InputForm);
export default WrapperInputForm;
