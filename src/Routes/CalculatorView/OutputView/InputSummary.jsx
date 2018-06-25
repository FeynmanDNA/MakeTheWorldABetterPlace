import React from 'react';
// get current states from global_store
import { inject, observer } from 'mobx-react';
import { List, Collapse } from 'antd';

const Panel = Collapse.Panel;


@inject('global_store')
@observer
class InputSummary extends React.Component {
  render() {
    const InputData = [];
    const { FormInputs } = this.props.global_store;
    Object.keys(FormInputs).map( key => (
      InputData.push(`${key} = ${FormInputs[key]}`)
    ));

    return (
      <Collapse accordion>
        <Panel header="Your Input Values" key="1">
            <List
              style={{
                overflowX: "auto",
              }}
              size="small"
              header={<b>Input Values: </b>}
              bordered
              dataSource={InputData}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        </Panel>
      </Collapse>
    );
  }
}
export default InputSummary;

