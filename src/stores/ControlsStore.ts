import { makeAutoObservable } from 'mobx';
import EventEmitter from 'eventemitter3';

export type ControlsEventsType = {
  setIsShowRuler: (value: boolean) => void;
  setMailSizes: () => void;
  setBackground: (background: string) => void;
  setTransparent: (value: boolean) => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

export type ControlsCurrentSelected = 'undo' | 'redo' | 'reload';

export default class ControlsStore {
  private readonly eventEmitter!: EventEmitter<ControlsEventsType>;

  public isShowRuler: boolean = false;

  public backgroundName: string = 'house';

  public mailWidth: number = 0;

  public mailDepth: number = 0;

  public mailHeight: number = 0;

  public supportingToolbarShow: boolean = false;

  public controlsShow: boolean = false;

  public controlsCurrent: ControlsCurrentSelected = 'undo';

  public confirmMenuShow: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.eventEmitter = new EventEmitter();
  }

  public setIsShowRuler(value: boolean): void {
    this.isShowRuler = value;
    this.eventEmitter.emit('setIsShowRuler', this.isShowRuler);
  }

  public setMailSizes(): void {
    this.eventEmitter.emit('setMailSizes');
  }

  public setSupportingToolbarShow(value: boolean): void {
    this.supportingToolbarShow = value;
  }

  public setControlsShow(value: boolean): void {
    this.controlsShow = value;
  }

  public setTransparentMails(isTransparent: boolean): void {
    this.eventEmitter.emit('setTransparent', isTransparent);
  }

  public setControlsCurrent(value: ControlsCurrentSelected): void {
    this.controlsCurrent = value;
  }

  public setConfirmMenuShow(value: boolean): void {
    this.confirmMenuShow = value;
  }

  public zoomOut(): void {
    this.eventEmitter.emit('zoomOut');
  }

  public zoomIn(): void {
    this.eventEmitter.emit('zoomIn');
  }

  public changeBackground(backgroundName: string): void {
    this.backgroundName = backgroundName;
    this.eventEmitter.emit('setBackground', backgroundName);
  }

  public subscribe<T extends keyof ControlsEventsType>(
    event: T,
    handler: ControlsEventsType[T],
  ): void {
    // TODO небольшой хак, нужно разобраться с типами
    this.eventEmitter.on(event, handler as (...args: any) => void);
  }
}
