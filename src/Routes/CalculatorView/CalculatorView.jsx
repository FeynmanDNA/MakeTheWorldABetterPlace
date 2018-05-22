import React from 'react';
import RouteWithSubRoutes from '../../RouteWithSubRoutes';
import StepsBar from './StepsBar';
import './CalculatorView.css';

class CalculatorView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main_container">
        <div className="steps_container">
          <StepsBar />
        </div>
        <div className="side_container">
          sidebar here
        </div>
        <div className="info_container">
          {this.props.routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          choose your calculator here friend
        </div>
      </div>
    );
  }
}

export default CalculatorView;
