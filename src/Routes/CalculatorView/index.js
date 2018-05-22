import CalculatorView from './CalculatorView';
import ChooseCalculator from './ChooseCalculator';
import ChooseConstantTF from './ChooseConstantTF';
import InputView from './InputView';
import OutputView from './OutputView';

export default {
  path: "/calculator",
  component: CalculatorView,
  routes: [
    ChooseCalculator,
    ChooseConstantTF,
    InputView,
    OutputView
  ]
};
