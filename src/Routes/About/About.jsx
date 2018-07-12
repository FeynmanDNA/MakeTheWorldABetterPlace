import React from 'react';
import { Spin, Layout, Anchor, Alert } from 'antd';
import TitleCard from './TitleCard';
import UsageCard from './UsageCard';
import BrowserSupportCard from './BrowserSupportCard';
import ChangeLogCard from './ChangeLogCard';
import TheoryPaper from './TheoryPaper';
import Contributing from './Contributing';
import Contributors from './Contributors';

//axios to send ajax request
import axios from 'axios';
import HTTPconfig from '../../HTTPconfig';

// get current step from global_store
import { inject, observer } from 'mobx-react';

const { Content } = Layout;
const { Link } = Anchor;

@inject('global_store')
@observer
class About extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ResultLoading: false,
      ServiceErrorServer: false, // if server is running
      ServerInfo: "",
    }

    this.loadServerInfo = this.loadServerInfo.bind(this);
  }

  async componentDidMount() {
    this.props.global_store.switchMenu("3");
    await this.loadServerInfo();
  }

  async loadServerInfo() {
    await this.setState({
      ResultLoading: true,
    });
    // send a GET request
    try {
      const MonitorServer = await axios({
        method: 'get',
        url: `${HTTPconfig.gateway}cpp_cal/monitor_server`,
      });
      console.log("Server Monitor Msg", MonitorServer);
      // if calculator started properly
      await this.setState({
        ResultLoading: false,
        ServerInfo: MonitorServer.data.server_info,
      });
    } catch (error) {
      // if server service error
      console.error(error);
      // change state for UI
      await this.setState({
        ServiceErrorServer: true,
        ResultLoading: false,
      });
    }
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
            <Spin spinning={this.state.ResultLoading}>
              {this.state.ServiceErrorServer ? (
                <Alert
                  message="We are having some problems with the server"
                  description="Please try again later"
                  type="warning"
                  banner
                />
              )
              : (
                <Alert
                  message="Server up and running"
                  description={this.state.ServerInfo}
                  type="success"
                  banner
                />
              )}
            </Spin>
            <div
              style={{
                width: 160,
                position: "fixed",
              }}
            >
              <Anchor
                offsetTop={230}
              >
                <Link href="#Title" title="Title" />
                <Link href="#Usage" title="Usage" />
                <Link href="#Browser-Support" title="Browser-Support" />
                <Link href="#Changelog" title="Changelog" />
                <Link href="#TheoreticalPapers" title="Theoretical papers" />
                <Link href="#Contributing" title="Contributing">
                  <Link href="#Contributing" title="Web application" />
                  <Link href="#Contributing" title="Calculator" />
                </Link>
                <Link href="#Contributors" title="Contributors" />
              </Anchor>
            </div>
            <TitleCard />
            <UsageCard />
            <BrowserSupportCard />
            <ChangeLogCard />
            <TheoryPaper />
            <Contributing />
            <Contributors />
          </Content>
        </Layout>
      </Content>
    );
  }
}

export default About;
