export interface VergeConfig {
  sceneURL: string;
  logicURL: string;
  id: string;
}

export const vergeConfig: VergeConfig = {
  id: "v3d-container",
  sceneURL: "configurator/v3dApp/verge_app.gltf",
  logicURL: "configurator/v3dApp/visual_logic.js",
};
