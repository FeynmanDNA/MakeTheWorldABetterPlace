import { observable, action } from 'mobx';

// Shared data store across pages
class GlobalStore {
  @observable topmenu = "1";
  @observable step = 0;
  @observable calculator= "";
  @observable mode= "";
  @observable calType="";

  @action.bound switchMenu(menu)
  {
    this.topmenu = menu;
  }

  @action.bound switchStep(step)
  {
    this.step = step;
  }

  @action.bound chooseCalculator(calculator)
  {
    this.calculator = calculator;
  }

  @action.bound chooseMode(mode)
  {
    this.mode = mode;
  }

  @action.bound clearState()
  {
    this.step = 0;
    this.calculator = "";
    this.mode = "";
  }

  @action.bound setCalType(calType)
  {
    this.calType = calType;
    switch(calType) {
      case "1":
        this.calculator = "Bare DNA";
        break;
      case "2":
        this.calculator = "With Nucleosome";
        break;
      case "3":
        this.calculator = "With DNA-insert";
        break;
      default:
        break;
    }
  }
}

export default GlobalStore;
