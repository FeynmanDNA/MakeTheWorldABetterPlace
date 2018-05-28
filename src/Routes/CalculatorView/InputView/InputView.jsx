import React from 'react';
import InputForm from './InputForm';
// get current step from global_store
import { inject, observer } from 'mobx-react';
import { Form, Input, Button, Icon } from 'antd';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;


@inject('global_store')
@observer
class InputView extends React.Component {
  componentDidMount() {
    //stepbar show step3
    this.props.global_store.switchStep(2);
    // match.params is string
    const { calType } = this.props.match.params;
    const { calMode } = this.props.match.params;
    // set the calType according to the url
    this.props.global_store.setCalType(calType);
    // set the calMode according to the url
    this.props.global_store.setCalMode(calMode);
  }

  render() {
    const { calType } = this.props.match.params;
    const { calMode } = this.props.match.params;
    return (
      <div>
        <Form>
          <FormItem
            label="DNA Length">
              <Input placeholder="DNA length" />
          </FormItem>
        </Form>
        {calType==="1"&&calMode==="2" 
          ? <p>1+2</p>
          : <p>nothing</p>
        }
        <ButtonGroup>
          <Button
            type="primary"
          >
            <Icon type="left" />
            Go back
          </Button>
          <Button
            type="primary"
          >
            Go forward
            <Icon type="right" />
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
export default InputView;
