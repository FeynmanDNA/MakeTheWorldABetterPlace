import React from 'react';
import { Card, Button, Icon } from 'antd';
import Img2 from '../../Assets/Screenshots/Screenshot_2018-07-09_14-27-01.png';
import Img3 from '../../Assets/Screenshots/Screenshot_2018-07-09_14-44-16.png';
import Img4 from '../../Assets/Screenshots/Screenshot_2018-07-09_14-37-41.png';
import Img5 from '../../Assets/Screenshots/Screenshot_2018-07-09_14-39-05.png';

/* the Carousel is from nuka-carousel
 * by Ken Wheeler
 * more @ https://github.com/FormidableLabs/nuka-carousel
 */
import Carousel from 'nuka-carousel';


class UsageCard extends React.Component {
  render() {
    return (
      <Card
        title="Usage"
        bordered={false}
        style={{
          width: 900,
          marginLeft: 170,
        }}
        extra={<a id="Usage">.</a>}
      >
        <p>Sample screenshots:</p>
      <Carousel
        slidesToShow={1}
        initialSlideHeight={675}
        swiping={false}
        dragging={false}
        wrapAround={true}
        renderCenterLeftControls={({ previousSlide, currentSlide }) => (
          <Button
            size="large"
            shape="circle"
            type="primary"
            style={{left: "-60px"}}
            onClick={previousSlide}
          >
            <Icon type="left" />
          </Button>
        )}
        renderCenterRightControls={({ nextSlide, currentSlide }) => (
          <Button
            size="large"
            shape="circle"
            type="primary"
            style={{right: "-60px"}}
            onClick={nextSlide}
          >
            <Icon type="right" />
          </Button>
        )}
      >
        <img alt="image2" src={Img2} />
        <img alt="image3" src={Img3} />
        <img alt="image4" src={Img4} />
        <img alt="image5" src={Img5} />
      </Carousel>
      </Card>
    );
  }
}

export default UsageCard;
