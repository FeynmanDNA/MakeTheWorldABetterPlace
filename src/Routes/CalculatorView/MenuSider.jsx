import React from 'react';
// sync step across pages
import { inject, observer } from 'mobx-react';
// antd js and css
import { Menu, Icon, Badge } from 'antd';

@inject('global_store')
@observer
class MenuSider extends React.Component {
  render() {
    const stepForViewer = this.props.global_store.step+1;
    // detect this.props.global_store's calculator and mode
    // are empty strings
    const calType = this.props.global_store.calculator
      ? (
        <span>
          <Badge status="success" />
          <b>{this.props.global_store.calculator}</b>
        </span>
      )
      : (
        <span>
          <Badge status="error" />
          &nbsp;&nbsp;&nbsp;&nbsp;...
        </span>
      );
    const calMode = this.props.global_store.mode
      ? (
        <span>
          <Badge status="success" />
          <b>{this.props.global_store.mode}</b>
        </span>
      )
      : (
        <span>
          <Badge status="error" />
          &nbsp;&nbsp;&nbsp;&nbsp;...
        </span>
      );
    // FormInputs is an object
    const { FormInputs } = this.props.global_store;
    const inputValue = (Object
      .keys(FormInputs).length === 0)
      ? (
        <span>
          <Badge status="error" />
          &nbsp;&nbsp;&nbsp;&nbsp;...
        </span>
      )
      : (
        <span>
          <Badge status="success" />
          <span><Icon type="lock" />Received</span>
        </span>
      );

    return (
      <Menu
        mode="inline"
        selectable={false}
        defaultSelectedKeys={['1']}
        style={{ height: '100%' }}
      >
        <Menu.Item
          key="1"
          style={{
            cursor:"default",
            fontWeight:"600",
          }}>
          Currently at Step {stepForViewer}
        </Menu.Item>
        <Menu.Item
          key="2"
          style={{
            cursor:"default",
          }}>
          <span><Icon type="dashboard" /></span>
          Calculator selected is:
        </Menu.Item>
        <Menu.Item
          key="caltype"
          style={{
            cursor:"default",
          }}>
          {calType}
        </Menu.Item>
        <Menu.Item
          key="3"
          style={{
            cursor:"default",
          }}>
          <span><Icon type="fork" /></span>
          Calculation mode:
        </Menu.Item>
        <Menu.Item
          key="calmode"
          style={{
            cursor:"default",
          }}>
          {calMode}
        </Menu.Item>
        <Menu.Item
          key="4"
          style={{
            cursor:"default",
          }}>
          <span><Icon type="form" /></span>
          Inputs:
        </Menu.Item>
        <Menu.Item
          key="inputs"
          style={{
            cursor:"default",
          }}>
          {inputValue}
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuSider;
