export interface SceneViewportOptions {
  scene: any;
}

export class SceneViewport {
  private scene: any;

  private camera: any;

  public zoomDistance = 0.3;

  constructor(options: SceneViewportOptions) {
    this.scene = options.scene;
    this.camera = options.scene.camera;
  }

  public updateSceneViewOffset(width: number, height: number): void {
    if (width < 1025) {
      this.camera.clearViewOffset();
      return;
    }
    if (width < 1201) {
      this.camera.setViewOffset(width, height, 150, 0, width, height);
      return;
    }
    if (width < 1921) {
      this.camera.setViewOffset(width, height, 220, 0, width, height);
    }
  }

  public pauseRendererCycle(): void {
    this.scene?.pause();
  }

  public runRendererCycle(): void {
    this.scene?.resume();
  }
}
