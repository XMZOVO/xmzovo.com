import { ArcRotateCamera, Color3, Color4, CubeTexture, Engine, HemisphericLight, Scene, SceneLoader, Vector3 } from '@babylonjs/core'
import '@babylonjs/loaders'

export class BaseScene {
  canvas: HTMLCanvasElement
  scene!: Scene
  camera!: ArcRotateCamera
  light!: HemisphericLight
  engine!: Engine
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.init()
  }

  init() {
    this.engine = this.initEngine()
    this.scene = this.initScene()
    this.camera = this.initCamera()
    this.light = this.initLight()
    this.initModel()
    this.render()
  }

  initEngine() {
    const engine = new Engine(this.canvas)
    engine.setHardwareScalingLevel(1 / window.devicePixelRatio)
    window.addEventListener('resize', () => {
      engine.resize()
    })
    return engine
  }

  initScene() {
    const scene = new Scene(this.engine)
    scene.clearColor = Color4.FromColor3(Color3.White(), 1)
    const hdrTexture = CubeTexture.CreateFromPrefilteredData('textures/environment.dds', scene)
    scene.createDefaultSkybox(hdrTexture, true)
    return scene
  }

  initCamera() {
    const camera = new ArcRotateCamera('camera', 2.49, 0.868, 7.46, new Vector3(0, 2, 0), this.scene)
    camera.attachControl(this.canvas, true)
    camera.wheelPrecision = 50
    return camera
  }

  initLight() {
    return new HemisphericLight('light', Vector3.Up(), this.scene)
  }

  async initModel() {
    // 导入gltf模型
    await SceneLoader.ImportMeshAsync('', '/model/', 'scene.gltf', this.scene)
  }

  render() {
    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }
}

