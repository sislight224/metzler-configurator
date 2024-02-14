import { makeAutoObservable } from 'mobx';
import PanelsStore from 'stores/PanelsStore';

export default class SummaryStore {
  private readonly _panelStore: PanelsStore;

  constructor(panelStore: PanelsStore) {
    this._panelStore = panelStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
