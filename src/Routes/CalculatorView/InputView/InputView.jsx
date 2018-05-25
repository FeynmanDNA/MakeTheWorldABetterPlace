import React from 'react';
import InputForm from './InputForm';
// get current step from global_store
import { inject, observer } from 'mobx-react';

@inject('global_store')
@observer
class InputView extends React.Component {
  componentDidMount() {
    //stepbar show step3
    this.props.global_store.switchStep(2);
    // match.params is string
    const { calType } = this.props.match.params;
    const { calMode } = this.props.match.params;
    // set the calType according to the url
    this.props.global_store.setCalType(calType);
    // set the calMode according to the url
    this.props.global_store.setCalMode(calMode);
  }

  render() {
    // different 3/2 2/1 need different input groups...
    return (
      <InputForm />
    );
  }
}
export default InputView;
