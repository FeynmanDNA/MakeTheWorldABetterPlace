import React from 'react';
import {Switch,Route} from 'react-router-dom';
import RouteWithSubRoutes from '../../RouteWithSubRoutes';
import StepsBar from './StepsBar';
import MenuSider from './MenuSider';
import DetectBrowser from './DetectBrowser';
// antd components
import { Layout } from 'antd';
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
    return (
      <Content style={{ padding: '0 50px' }}>
        <DetectBrowser />
        <StepsBar />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={220} style={{ background: '#fff' }}>
            <MenuSider />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 500
            }}>
            <Switch>
              {this.props.routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
              <Route render={() => <p>There is something wrong with your URL. Try going back to Step 1 by clicking the "Calculator" button on top.</p>} />
            </Switch>
          </Content>
        </Layout>
      </Content>
    );
  }
}

export default CalculatorView;
