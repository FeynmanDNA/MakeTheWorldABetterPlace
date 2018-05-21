import CalculatorView from './CalculatorView';
import ChooseCalculator from './ChooseCalculator';
import InputView from './InputView';

export default {
  path: "/calculator",
  component: CalculatorView,
  routes: [
    ChooseCalculator, InputView
  ]
};
