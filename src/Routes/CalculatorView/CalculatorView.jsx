import React from 'react';
import RouteWithSubRoutes from '../../RouteWithSubRoutes';
import StepsBar from './StepsBar';
// antd components
import { Layout, Menu, Icon } from 'antd';
// for current step and menu from global_store
import { inject, observer } from 'mobx-react';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

@inject('global_store')
@observer
class CalculatorView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.global_store.switchMenu("1");
  }

  render() {
    const stepForViewer = this.props.global_store.step+1;
    return (
      <Content style={{ padding: '0 50px' }}>
        <div className="steps_container">
          <StepsBar />
        </div>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                <Menu.Item key="1">Current step is: {stepForViewer}</Menu.Item>
                <Menu.Item key="2">Current calculator is: {this.props.global_store.calculator}</Menu.Item>
                <Menu.Item key="3">Current mode is: {this.props.global_store.mode}</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
