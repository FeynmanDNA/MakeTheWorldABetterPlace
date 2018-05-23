import React from 'react';
import RouteWithSubRoutes from '../../RouteWithSubRoutes';
import StepsBar from './StepsBar';
import './CalculatorView.css';
// get current step from global_store
import { inject, observer } from 'mobx-react';

@inject('global_store')
@observer
class CalculatorView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.global_store.switchMenu("1");
  }

  render() {
    const stepForViewer = this.props.global_store.step+1;
    return (
      <div className="main_container">
        <div className="steps_container">
          <StepsBar />
        </div>
        <div className="calculator_container">
          <div className="side_container">
            sidebar here
            <br />
            Current step is: {stepForViewer}
            <br />
            Current calculator is: {this.props.global_store.calculator}
            <br />
            Current mode is: {this.props.global_store.mode}
          </div>
          <div className="info_container">
            {this.props.routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CalculatorView;
