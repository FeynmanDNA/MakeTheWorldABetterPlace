import React from 'react';
import './main.css';
import HeaderView from './HeaderView';
import FooterView from './FooterView';
import { Layout } from 'antd';
const { Content } = Layout;

class Main extends React.Component {
  render() {
    return (
      <Layout style={{minWidth: 1100}}>
        <HeaderView />
        <Content
          style={{ padding: '20px 50px' }}
        >
            {this.props.children}
        </Content>
        <FooterView />
      </Layout>
    );
  }
}

export default Main;
