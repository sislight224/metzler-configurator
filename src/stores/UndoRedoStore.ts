import { makeAutoObservable } from 'mobx';
import { AllStatesType } from './panels/PanelStore';
import PanelsStore from './PanelsStore';
import PanelId from '../enums/PanelId';

export default class UndoRedoStore {
  public initState: AllStatesType = {};

  public undoRedo: AllStatesType[] = [];

  public currentIndex: number = 0;

  public readonly panelsStore!: PanelsStore;

  constructor(init: AllStatesType, panelsStore: PanelsStore) {
    this.initState = init;
    this.panelsStore = panelsStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getCurrentState(): AllStatesType {
    return this.undoRedo[this.currentIndex];
  }

  public addStateRecord() {
    if (this.currentIndex < this.undoRedo.length - 1) this.currentIndex = this.undoRedo.length;

    if (this.undoRedo.length >= 5) this.undoRedo.shift();

    this.undoRedo.push(this.panelsStore.getAllStates());

    if (this.currentIndex < 5) this.currentIndex++;
  }

  public goBack(activePanelId?: PanelId | null) {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
    const newState = this.getCurrentState();
    if (activePanelId) {
      newState.activePanelId = activePanelId;
      this.undoRedo.length = this.currentIndex + 1;
    }
    this.panelsStore.setAllStates(newState);
  }

  public goForward() {
    this.currentIndex = Math.min(this.undoRedo.length - 1, this.currentIndex + 1);
    const newState = this.getCurrentState();
    this.panelsStore.setAllStates(newState);
  }

  public resetState() {
    this.currentIndex = 0;
    this.undoRedo = [this.initState];
    this.panelsStore.setAllStates(this.initState);
  }

  public cleanUndoRedo() {
    this.currentIndex = 0;
    this.undoRedo = [this.getCurrentState()];
  }
}
