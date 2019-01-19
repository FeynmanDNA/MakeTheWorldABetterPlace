import React from 'react';
import CardView from './CardView';
//imgs for the card
import BareDNAImg from '../../../Assets/bareDNA.jpg';
import WithNulImg from '../../../Assets/WithNucleosome.jpg';
import WithInsImg from '../../../Assets/WithInsert.jpg';
import PolymerImg from "../../../Assets/Polymer.png"
// get current step from global_store
// and to manage global states
import { inject, observer } from 'mobx-react';
import { Col, Row } from 'antd';


const BareDNAInfo =  (
  <p style={{fontSize: "13px"}}>Calculates the conformation of bare DNA under force and torque constraints.<br /><br />In the calculations, DNA is allowed to transit between 4 DNA structural states: B-, L-, P- and S-DNA.</p>
);

const BareDNATitle = (
  <div><b>Bare DNA</b><br /><p style={{margin:0, padding:0}}>Force - Torque responses of DNA structural <br />transition</p></div>
)

const WithNulInfo = (
  <p style={{fontSize: "13px"}}>Calculates the conformation of DNA in the presence of nucleosome formation by histone octamers under force and torque constraints. DNA can have 3 structural states: B-, L- and P-DNA. Nucleosomes are assumed to form only on B-DNA.</p>
);

const WithNulTitle = (
  <div><b>With Nucleosome</b><br /><p style={{margin:0, padding:0}}>Force - Torque responses of nucleosomes</p></div>
)

const WithInsInfo = (
  <p style={{fontSize: "13px"}}>Calculates changes in the conformation of heterogeneous DNA containing an insert in the center. The DNA insert is characterized by its own base-pairing energies and relaxed linking numbers (i.e., helical repeats) of alternative DNA structures, such as L-, P- and S-DNA.</p>
);

const WithInsTitle = (
  <div><b>With DNA-insert</b><br /><p style={{margin:0, padding:0}}>Effect of specific DNA insert on DNA <br />structural transition</p></div>
)

const PolymerInfo = (
  <p style={{fontSize: "13px"}}>Calculates the force-extension curves of polymers based on their segment length and persistence length. Polymer's persistence length needs to be in the range of 10 to 1000 times of the segment length.</p>
)

const PolymerTitle = (
  <div><b>Polymer</b><br /><p style={{margin:0, padding:0}}>Force-Extension curves of polymers</p></div>
)

@inject('global_store')
@observer
class ChooseCalculator extends React.Component {
  componentDidMount() {
    //stepbar show step1
    this.props.global_store.switchStep(0);
    //clear the form inputs in the mobx state
    this.props.global_store.clearForm();
    //reset sidebar
    this.props.global_store.clearSideBar()
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
        <Row gutter={8}>
          <Col span={12}>
            <CardView
              title={BareDNATitle}
              imgsrc={BareDNAImg}
              info={BareDNAInfo}
              handleClick={this.clickBareDNA}
            />
          </Col>
          <Col span={12}>
            <CardView
              title={WithNulTitle}
              imgsrc={WithNulImg}
              info={WithNulInfo}
              handleClick={this.clickWithNul}
            />
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={12}>
            <CardView
              title={WithInsTitle}
              imgsrc={WithInsImg}
              info={WithInsInfo}
              handleClick={this.clickWithIns}
            />
          </Col>
          <Col span={12}>
            <CardView
              title={PolymerTitle}
              imgsrc={PolymerImg}
              info={PolymerInfo}
              handleClick={this.clickWithIns}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ChooseCalculator;
