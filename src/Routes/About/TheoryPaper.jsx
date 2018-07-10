import React from 'react';
import { Card, List } from 'antd';


const data = [
  {
    title: 'Transfer-matrix calculations of DNA polymer micromechanics under tension and torque constraints',
    descript: 'AK Efremov, RS Winardhi, J Yan, in Physical Review E 2016',
    link: 'https://journals.aps.org/pre/abstract/10.1103/PhysRevE.94.032404',
    topic: "Bare DNA + With DNA-insert"
  },
  {
    title: 'Theoretical Methods for Studying DNA Structural Transitions under Applied Mechanical Constraints',
    descript: 'AK Efremov, RS Winardhi, J Yan, in Polymers 2017',
    link: 'http://www.mdpi.com/2073-4360/9/2/74',
    topic: "Bare DNA"
  },
  {
    title: 'Transfer-matrix calculations of the effects of tension and torque constraints on DNA–protein interactions',
    descript: 'AK Efremov, J Yan, in Nucleic Acids Research 2018',
    link: 'https://academic.oup.com/nar/advance-article/doi/10.1093/nar/gky478/5033546',
    topic: "With Nucleosome"
  },
];



class TheoryPaper extends React.Component {
  render() {
    return (
      <Card
        title="Theoretical Papers"
        bordered={false}
        style={{
          width: 900,
          marginLeft: 170,
        }}
        extra={<a id="TheoreticalPapers">.</a>}
      >
        <p>Please use the following publications if you wish to cite this online calculator.</p>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={[
                <b>{item.topic}</b>,
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  link
                </a>
              ]}>
              <List.Item.Meta
                title={item.title}
                description={item.descript}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default TheoryPaper;
