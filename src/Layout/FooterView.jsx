import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

class FooterView extends React.Component {
  render() {
    return (
      <Footer
        style={{
          textAlign: 'center',
          height: 25,
          padding:2,
          backgroundColor:"#fff"
        }}>
        <a href="https://www.physics.nus.edu.sg/~biosmm/"
           target="_blank"
           rel="noopener noreferrer">
          Yan Jie Group
        </a>
        &nbsp;
        © 2018 
      </Footer>
    );
  }
}

export default FooterView;
