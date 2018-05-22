import { observable, action } from 'mobx';

// Shared data store across pages
class GlobalStore {
  @observable step = 0;

  @action.bound switchStep(step)
  {
    this.step = step;
  }
}

export default GlobalStore;
