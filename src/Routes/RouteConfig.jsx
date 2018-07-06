import Calculator from './CalculatorView';
import Publications from './Publications';
import About from './About';
import RootRedirect from './RootRedirect';

const routes = () => [
  RootRedirect, Calculator, Publications, About
];

export default routes;
