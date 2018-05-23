import React from 'react';
// get current step from global_store
import { inject, observer } from 'mobx-react';

@inject('global_store')
@observer
class ChooseConstantTF extends React.Component {
  componentDidMount() {
    this.props.global_store.switchStep(1);
    this.props.global_store.chooseCalculator("Bare");
    const { caltype } = this.props.match.params;
    this.props.global_store.chooseMode(caltype);
  }

  render() {
    if (this.props.global_store.mode === "Mode1") {
      return (
        <h1>Mode1 selected!</h1>
      );
    }
    return (
      <p>Choose which you want to be constant</p>
    );
  }
}

export default ChooseConstantTF;
