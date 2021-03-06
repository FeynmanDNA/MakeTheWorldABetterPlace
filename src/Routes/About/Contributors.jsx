import React from 'react';
import { Card, List, Avatar } from 'antd';


const data = [
  {
    title: 'Front-end',
    names: 'Yang Kaiyuan, Olafs Vandans',
  },
  {
    title: 'Back-end',
    names: "Yang Kaiyuan, Olafs Vandans, Ladislav Hovan",
  },
  {
    title: "C++ calculator",
    names: "Artem Efremov, Ladislav Hovan",
  },
  {
    title: 'Frontpage Artwork',
    names: "Artem Efremov",
  },
  {
    title: 'Theory',
    names: "Yan Jie, Artem Efremov",
  },
];


class Contributors extends React.Component {
  render() {
    return (
      <Card
        title="Contributors"
        bordered={false}
        style={{
          width: 900,
          marginLeft: 170,
        }}
        extra={<a id="Contributors">.</a>}
      >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon="user" />}
              title={item.title}
              description={item.names}
            />
          </List.Item>
        )}
      />
      </Card>
    );
  }
}

export default Contributors;
