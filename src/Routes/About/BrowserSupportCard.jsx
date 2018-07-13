import React from 'react';
import { Card, Tree, Icon } from 'antd';

const TreeNode = Tree.TreeNode;


class BrowserSupportCard extends React.Component {
  render() {
    return (
      <Card
        title="Browser-Support"
        bordered={false}
        style={{
          width: 900,
          marginLeft: 170,
        }}
        extra={<a id="Browser-Support">.</a>}
      >
        <p>Help raise issues with browser support in <a href="#Contributing">Contributing</a></p>
        <Tree
          showIcon
          defaultExpandAll
        >
          <TreeNode selectable={false} icon={<Icon type="like-o" />} title="Supported browsers" key="0-0">
            <TreeNode selectable={false} icon={<Icon type="check" />} title="Vivaldi" key="0-0-0" />
            <TreeNode selectable={false} icon={<Icon type='check' />} title="Chrome" key="0-0-1" />
            <TreeNode selectable={false} icon={<Icon type='check' />} title="Brave" key="0-0-2" />
            <TreeNode selectable={false} icon={<Icon type='check' />} title="Firefox (some equations in PDF are not rendered correctly by Firefox, eg NAR2018 paper)" key="0-0-3" />
            <TreeNode selectable={false} icon={<Icon type='check' />} title="Safari" key="0-0-4" />
            <TreeNode selectable={false} icon={<Icon type='check' />} title="Opera" key="0-0-5" />
            <TreeNode selectable={false} icon={<Icon type='check' />} title="Edge (14 and above)" key="0-0-6" />
          </TreeNode>
          <TreeNode selectable={false} icon={<Icon type="warning" />} title="Not supported browsers" key="0-1">
            <TreeNode selectable={false} icon={<Icon type='exclamation-circle-o' />} title="Internet Explorer" key="0-1-0" />
            <TreeNode selectable={false} icon={<Icon type='exclamation-circle-o' />} title="Midori" key="0-1-1" />
          </TreeNode>
        </Tree>
      </Card>
    );
  }
}

export default BrowserSupportCard;
