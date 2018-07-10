import React from 'react';
import CardView from './CardView';
//imgs for the card
import BareDNAImg from '../../../Assets/bareDNA.jpg';
import WithNulImg from '../../../Assets/WithNucleosome.jpg';
import WithInsImg from '../../../Assets/WithInsert.jpg';
// get current step from global_store
// and to manage global states
import { inject, observer } from 'mobx-react';
import { Col, Row } from 'antd';


const BareDNAInfo =  (
  <p>Bare DNA version of the program calculates the conformation of bare DNA under force and torque constraints.<br /><br />In the calculations, DNA is allowed to transit between 4 DNA structural states: B-, L-, P- and S-DNA.</p>
);

const WithNulInfo = (
  <p>This version calculates the conformation of DNA in the presence of nucleosome formation by histone octamers under force and torque constraints applied to the DNA.<br /><br />In the calculations, DNA is allowed to transit between 3 structural states: B-, L- and P-DNA. Nucleosomes are assumed to form only on B-DNA parts of the polymer.</p>
);

const WithInsInfo = (
  <p>This version of the program evaluates changes in the conformation of heterogeneous DNA, which contains an insert in the center of the molecule. The DNA insert is characterized by its own base-paring energies and relaxed linking numbers (i.e., helical repeats) of alternative DNA structures, such as L-, P- and S-DNA.</p>
);

@inject('global_store')
@observer
class ChooseCalculator extends React.Component {
  componentDidMount() {
    //stepbar show step1
    this.props.global_store.switchStep(0);
    //clear the form inputs in the mobx state
    this.props.global_store.clearForm();
  }

  clickBareDNA = () => {
    this.props.global_store.chooseCalculator("Bare DNA");
    this.props.history.push(
      '/calculator/1/choosemode'
    );
  }

  clickWithNul = () => {
    this.props.global_store.chooseCalculator("With Nucleosome");
    this.props.history.push(
      '/calculator/2/choosemode'
    );
  }

  clickWithIns = () => {
    this.props.global_store.chooseCalculator("With DNA-insert");
    this.props.history.push(
      '/calculator/3/choosemode'
    );
  }

  render() {
    return (
      <React.Fragment>
        <Row type="flex" justify="space-around">
          <Col span={7}>
            <CardView
              title="Bare DNA"
              imgsrc={BareDNAImg}
              info={BareDNAInfo}
              handleClick={this.clickBareDNA}
            />
          </Col>
          <Col span={7}>
            <CardView
              title="With Nucleosome"
              imgsrc={WithNulImg}
              info={WithNulInfo}
              handleClick={this.clickWithNul}
            />
          </Col>
          <Col span={7}>
            <CardView
              title="With DNA-insert"
              imgsrc={WithInsImg}
              info={WithInsInfo}
              handleClick={this.clickWithIns}
            />
          </Col>
        </Row>
      <br />
      </React.Fragment>
    );
  }
}

export default ChooseCalculator;
