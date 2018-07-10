import React from 'react';
import { Card } from 'antd';

class Contributing extends React.Component {
  render() {
    return (
      <Card
        title="Contributing"
        bordered={false}
        style={{
          width: 900,
          marginLeft: 170,
        }}
        extra={<a id="Contributing">.</a>}
      >
        <p><b>Web application:</b> This web project is an open-source project. All libraries used are open-sourced themselves, such as React, Ant Design, Flask and NginX. It is an open development hosted on <a href='https://github.com/FeynmanDNA/MakeTheWorldABetterPlace' target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        <p><b>Calculator:</b> The calculator, as appeared in the publications, was originally written in Matlab. The source code is available for download <a href='http://www.artem-efremov.org' target="_blank" rel="noopener noreferrer">here</a>. The Matlab version was later converted to a C++ calculator, which is used in this web portal. The C++ calculator is hosted open-source on <a href='https://bitbucket.org/FeynmanDNA/yjg-cpp-calculator/src/master' target="_blank" rel="noopener noreferrer">BitBucket</a></p>
      </Card>
    );
  }
}

export default Contributing;
