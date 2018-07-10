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
  // from https://github.com/FormidableLabs/nuka-carousel/issues/103
  // to hold Carousel image height
  componentDidMount() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  render() {
    return (
      <Card
        title="Usage"
        bordered={false}
        style={{
          width: 900,
          margin: "0 auto",
        }}
      >
        <p>Sample screenshots:</p>
      <Carousel
        slidesToShow={1}
        renderCenterLeftControls={({ previousSlide, currentSlide }) => (
          <Button
            style={(currentSlide !== 0)
              ? {visibility: "visible", left: "-30px"}
              : {visibility: "hidden"}
            }
            onClick={previousSlide}
          >
            <Icon type="left" />
          </Button>
        )}
        renderCenterRightControls={({ nextSlide, currentSlide }) => (
          <Button
            style={(currentSlide === 3)
              ? {visibility: "hidden"}
              : {visibility: "visible", right: "-30px"}
            }
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
