import React from 'react';
import { Layout, Tooltip } from 'antd';
const { Footer } = Layout;

class FooterView extends React.Component {
  render() {
    return (
      <Footer
        style={{
          textAlign: 'center',
          height: 25,
          padding:2,
          backgroundColor:"#fff",
        }}>
        <Tooltip title="Our main website @ NUSPhysics">
          <a href="https://www.physics.nus.edu.sg/~biosmm/"
             target="_blank"
             rel="noopener noreferrer">
            Yan Jie Group
          </a>
        </Tooltip>
        &nbsp;
        © 2019 
      </Footer>
    );
  }
}

export default FooterView;
