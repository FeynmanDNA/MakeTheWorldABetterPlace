import React from 'react';
import PdfView from './PdfView';
// antd components
import { Layout } from 'antd';
// for current step and menu from global_store
import { inject, observer } from 'mobx-react';

const { Content } = Layout;

@inject('global_store')
@observer
class Publications extends React.Component {
  componentDidMount() {
    this.props.global_store.switchMenu("2");
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
            <PdfView />
          </Content>
        </Layout>
      </Content>
    );
  }
}

export default Publications;
