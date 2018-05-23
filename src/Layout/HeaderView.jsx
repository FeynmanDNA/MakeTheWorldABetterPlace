import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header } = Layout;

@inject('global_store')
@observer
class HeaderView extends React.Component {
  render() {
    return (
        <Header
          style={{
            height:61,
            backgroundColor:"white",
            display: "flex",
            justifyContent: "space-between",
          }}>
          <div className="header_content">
            Calculator@YJG
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[
              this.props.global_store.topmenu
            ]}
            style={{ lineHeight: '60px' }}
          >
            <Menu.Item key="1">
              <Link to='/calculator/choosecalculator'>
                <span><Icon type="code" /></span>
                Calculator
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/publications'>
                <span><Icon type="file-pdf" /></span>
                Publications
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/about'>
                <span><Icon type="github" /></span>
                About
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
    );
  }
}

export default HeaderView;
