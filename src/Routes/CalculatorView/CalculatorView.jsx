import React from 'react';
import RouteWithSubRoutes from '../../RouteWithSubRoutes';
import StepsBar from './StepsBar';
// antd components
import { Layout, Menu, Icon, Badge } from 'antd';
// for current step and menu from global_store
import { inject, observer } from 'mobx-react';

const { Content, Sider } = Layout;

@inject('global_store')
@observer
class CalculatorView extends React.Component {
  componentDidMount() {
    this.props.global_store.switchMenu("1");
  }

  render() {
    const stepForViewer = this.props.global_store.step+1;
    return (
      <Content style={{ padding: '0 50px' }}>
        <StepsBar />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={220} style={{ background: '#fff' }}>
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
                <span><Icon type="step-forward" /></span>
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
              <Menu.Item key="a">
                {this.props.global_store.calculator
                  ? this.props.global_store.calculator
                  : <Badge status="error" />}
              </Menu.Item>
              <Menu.Item
                key="3"
                style={{
                  cursor:"default",
                }}>
                <span><Icon type="fork" /></span>
                Calculation mode:
              </Menu.Item>
              <Menu.Item key="i">
                {this.props.global_store.mode}
              </Menu.Item>
            </Menu>
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 420,
            }}>
            {this.props.routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Content>
        </Layout>
      </Content>
    );
  }
}

export default CalculatorView;
