import React from 'react';
import { Layout, Card, Tooltip } from 'antd';
import UsageCard from './UsageCard';
// get current step from global_store
import { inject, observer } from 'mobx-react';

const { Content } = Layout;

@inject('global_store')
@observer
class About extends React.Component {
  componentDidMount() {
    this.props.global_store.switchMenu("3");
  }

  render() {
    return (
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 420,
            }}
          >
            <Card
              title="Yan Jie Group's Calculator Web-app"
              bordered={false}
              style={{
                width: 900,
                margin: "0 auto",
              }}
            >
              <p>An online calculator that calculates the DNA extension, linking number change, and structural state of DNA under given force and torque constraints, with DNA interactions with protein complexes and other DNA-inserts.</p>
              <p>Brought to you by <Tooltip title="YJG website"><a href="https://www.physics.nus.edu.sg/~biosmm/" target="_blank" rel="noopener noreferrer">Yan Jie's research group</a></Tooltip> @ National University of Singapore</p>
            </Card>
            <UsageCard />
          </Content>
        </Layout>
      </Content>
    );
  }
}

export default About;
