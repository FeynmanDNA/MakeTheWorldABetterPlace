import { observable, action, extendObservable } from 'mobx';

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
    // when unmount the inputform, only retain the values for submit
    // if user proceed back, clear the form inputs stored in mobx
    this.FormInputs={};
  }

  @action.bound SubmitBtnStatus(value)
  {
    // change the inputStatus depending on the validation of the form
    value ? this.inputStatus = true : this.inputStatus = false;
  }

  // six JSON formats for three calculator types
  // Format 1 BareDNA Constant Force, Torque Array
  @action.bound SubmitBareConF(inputArray)
  {
    this.FormInputs = {
      "DNALength": parseInt(document.getElementById("DNALength").value, 10),
      "force": parseFloat(document.getElementById("ConstForce").value),
      "torque": inputArray,
      "maxmode": parseInt(document.getElementById("MaxMode").value, 10),
    };
  }

  // Format 2 BareDNA Force Array, Constant Torque
  @action.bound SubmitBareConT(inputArray)
  {
    this.FormInputs = {
      "DNALength": parseInt(document.getElementById("DNALength").value, 10),
      "force": inputArray,
      "torque": parseFloat(document.getElementById("ConstTorque").value),
      "maxmode": parseInt(document.getElementById("MaxMode").value, 10),
    };
  }

  // extend the observable state of FormInputs for BareDNA's AdvBDNAParam
  @action.bound addStateMobx(newState)
  {
    const { b_BValue, A_BValue, C_BValue, lambda_B } = newState;
    // extendObservable can be used to add new observable properties to an object
    extendObservable(this.FormInputs, {
      "b_B": b_BValue,
      "A_B": A_BValue,
      "C_B": C_BValue,
      "lambda_B": lambda_B,
    });
  }

}

export default GlobalStore;
