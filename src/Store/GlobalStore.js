import { observable, action, extendObservable } from 'mobx';

// Shared data store across pages
class GlobalStore {
  @observable topmenu = "";
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

  @action.bound clearSideBar()
  {
    this.calculator = ""
    this.mode = ""
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
  @action.bound SubmitInputForm(calType, calMode, inputArray)
  {
    // Format 1 BareDNA Constant Force, Torque Array
    if (calType === "Bare DNA") {
      if (calMode === "Constant Torque") {
        this.FormInputs = {
          "DNALength": parseInt(document.getElementById("DNALength").value, 10),
          "force": inputArray,
          "torque": parseFloat(document.getElementById("ConstTorque").value),
          "maxmode": parseInt(document.getElementById("MaxMode").value, 10),
        };
      // Format 2 BareDNA Constant Torque, Force Array
      } else if (calMode === "Constant Force") {
        this.FormInputs = {
          "DNALength": parseInt(document.getElementById("DNALength").value, 10),
          "force": parseFloat(document.getElementById("ConstForce").value),
          "torque": inputArray,
          "maxmode": parseInt(document.getElementById("MaxMode").value, 10),
        };
      }
    // Format 3 WithNul Constant Force, Torque Array
    } else if (calType === "With Nucleosome") {
      if (calMode === "Constant Torque") {
        this.FormInputs = {
          "DNALength": parseInt(document.getElementById("DNALength").value, 10),
          "force": inputArray,
          "torque": parseFloat(document.getElementById("ConstTorque").value),
          "mu_protein": parseFloat(document.getElementById("ProteinE").value),
          "maxmode": parseInt(document.getElementById("MaxMode").value, 10),
        };
      // Format 4 WithNul Constant Torque, Force Array
      } else if (calMode === "Constant Force") {
        this.FormInputs = {
          "DNALength": parseInt(document.getElementById("DNALength").value, 10),
          "force": parseFloat(document.getElementById("ConstForce").value),
          "torque": inputArray,
          "mu_protein": parseFloat(document.getElementById("ProteinE").value),
          "maxmode": parseInt(document.getElementById("MaxMode").value, 10),
        };
      }
    // Format 5 WithIns Constant Force, Torque Array
    } else if (calType === "With DNA-insert") {
      if (calMode === "Constant Torque") {
        this.FormInputs = {
          "DNALength": parseInt(document.getElementById("DNALength").value, 10),
          "insert_length": parseFloat(document.getElementById("InsertLength").value),
          "force": inputArray,
          "torque": parseFloat(document.getElementById("ConstTorque").value),
          "maxmode": parseInt(document.getElementById("MaxMode").value, 10),
        };
      // Format 6 WithIns Constant Torque, Force Array
      } else if (calMode === "Constant Force") {
        this.FormInputs = {
          "DNALength": parseInt(document.getElementById("DNALength").value, 10),
          "insert_length": parseFloat(document.getElementById("InsertLength").value),
          "force": parseFloat(document.getElementById("ConstForce").value),
          "torque": inputArray,
          "maxmode": parseInt(document.getElementById("MaxMode").value, 10),
        };
      }
    }
  }

  // extend the observable state of FormInputs
  @action.bound addStateMobx(calType, newState)
  {
    // BareDNA's AdvBDNAParam
    if (calType === "forBDNA") {
      const { b_BValue, A_BValue, C_BValue, lambda_B } = newState;
      // extendObservable can be used to add new observable properties to an object
      extendObservable(this.FormInputs, {
        "b_B": b_BValue,
        "A_B": A_BValue,
        "C_B": C_BValue,
        "lambda_B": lambda_B,
      });
    // WithIns' AdvInsertParam
    } else if (calType === "forInsert") {
      const {
        A_B_insert,
        C_B_insert,
        lambda_B_insert,
        mu_L_insert,
        lk_L_0_insert,
        mu_P_insert,
        lk_P_0_insert,
        mu_S_insert,
        lk_S_0_insert} = newState;

      extendObservable(this.FormInputs, {
        "A_B_insert": A_B_insert,
        "C_B_insert": C_B_insert,
        "lambda_B_insert": lambda_B_insert,
        "mu_L_insert": mu_L_insert,
        "lk_L_0_insert": lk_L_0_insert,
        "mu_P_insert": mu_P_insert,
        "lk_P_0_insert": lk_P_0_insert,
        "mu_S_insert": mu_S_insert,
        "lk_S_0_insert": lk_S_0_insert,
      });
    }
  }
}

export default GlobalStore;
