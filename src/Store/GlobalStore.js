import { observable, action } from 'mobx';

// Shared data store across pages
class GlobalStore {
  @observable topmenu = "1";
  @observable step = 0;
  @observable calculator= "";
  @observable mode= "";
  @observable calType="";
  @observable calMode="";
  @observable inputStatus=true;
  @observable FormInputs={};

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

  @action.bound setCalType(calType)
  {
    // this.calType is needed for history.push
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

  @action.bound setCalMode(calMode)
  {
    // this.calMode is needed for history.push
    this.calMode = calMode;
    switch(calMode) {
      case "1":
        this.mode = "Constant Torque";
        break;
      case "2":
        this.mode = "Constant Force";
        break;
      default:
        break;
    }
  }

  @action.bound clearForm()
  {
    // when leaving InputView component, clear the fom data
    this.FormInputs={};
  }

  @action.bound SubmitBtnStatus(value)
  {
    // change the inputStatus depending on the validation of the form
    value ? this.inputStatus = true : this.inputStatus = false;
  }
}

export default GlobalStore;
