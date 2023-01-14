---
title: PBR材质纹理
category:
  - 前端开发
  - 前端图形
  - Three.js
order: 5
---

## PBR 物理渲染

>[什么是 PBR？](https://zhuanlan.zhihu.com/p/342484575)

基于物理渲染

以前的渲染在模仿灯光的外观

现在是在模仿光的实际行为

使图形看起来跟真实

### 标准网格材质与光照物理效果

`MeshStandardMaterial`一种基于物理(`PBR`)的标准材质

环境光`AmbientLight`环境光会均匀的照亮场景中的所有物体。环境光不能用来投射阴影，因为它没有方向

平行光`DirectionalLight` ,必须设置`positon`它的方向是从一个平行光的位置` position`到 `target`(默认(0,0,0))的位置。平行光可以投射阴影

## 置换贴图与顶点细分设置

`displacementMap`:位移贴图会影响网格顶点的位置，黑色是无位移，白色是最大位移。 

  为了使得它起作用我们还需要设置几何体的宽度/高度的分段数(默认为1肯定无作用，相当于只有一个顶点，怎么影响)，值越高，越精细，当时渲染成本也就越大

`displacementScale `控制位移贴图对网格的影响程度

## 设置粗糙度与粗糙度贴图

`roughness`用于设置材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0。如果还提供`roughnessMap`，则两个值相乘。

## 设置金属度与金属贴图  

非金属材质，如木材或石材，使用0.0，金属使用1.0，  默认值为0.0。0.0到1.0之间的值可用于生锈金属的外观。如果还提供了`metalnessMap`，则两个值相乘

## 法线贴图

法线贴图的作用用于改变光照效果

## 代码示例：木门

```js
/**
 * @description 注释精修版V2.0
 * @author Frank
 */
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//  创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// 设置相机位置
camera.position.set(0, 0, 1.5)
// 将相机添加到场景中
scene.add(camera)
// 加载颜色贴图
const doorTexture = new THREE.TextureLoader().load('/src/assets/textures/door/color.jpg')
// 加载透明贴图
const alphaTexture = new THREE.TextureLoader().load('/src/assets/textures/door/alpha.jpg')
// 加载环境遮挡贴图
const aoTexture = new THREE.TextureLoader().load('./src/assets/textures/door/ambientOcclusion.jpg')
// 加载置换贴图
const doorHeightTexture=new THREE.TextureLoader().load('./src/assets/textures/door/height.jpg')
// 加载粗糙度贴图
const roughnessTexture=new THREE.TextureLoader().load('./src/assets/textures/door/roughness.jpg')
// 加载金属贴图
const metalnessTexture=new THREE.TextureLoader().load('./src/assets/textures/door/metalness.jpg')
// 加载法线贴图
const normalTexture=new THREE.TextureLoader().load('./src/assets/textures/door/normal.jpg')
// 创建平面几何体
const PlaneGeometry = new THREE.PlaneGeometry(1,1,100,100)
// aoMap必须设置第二组uv
PlaneGeometry.setAttribute('uv2', new THREE.BufferAttribute(PlaneGeometry.attributes.uv.array, 2))
// 创建材质
const material = new THREE.MeshStandardMaterial({
    map: doorTexture,
    alphaMap: alphaTexture,
    transparent: true,
    side: THREE.DoubleSide,
    aoMap: aoTexture,
    displacementMap:doorHeightTexture,
    displacementScale:0.07,
    aoMapIntensity: 1,
    roughness:1,
    roughnessMap:roughnessTexture,
    metalness:.7,
    metalnessMap:metalnessTexture,
    normalMap:normalTexture
})
// 创建物体
const plane = new THREE.Mesh(PlaneGeometry, material )
// 将平面添加到场景
scene.add(plane)
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer2.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer2.domElement)
// 阻尼效果
controls.enableDamping = true
// 环境光
const light = new THREE.AmbientLight(0xffffff,1); // soft white light
scene.add(light);
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 添加灯光到场景
scene.add(directionalLight)
directionalLight.position.set(10,10,10)
// 渲染函数
function render() {
    renderer.render(scene, camera)
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}
render()
```

## 获取各种类型纹理贴图

[poliigon](https://www.poliigon.com/)

[Bridge](https://quixel.com/bridge)<Badge text='推荐资源多'/>

## 环境贴图

```js
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//  创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// 设置相机位置
camera.position.set(3, 3, 3)
// 将相机添加到场景中
scene.add(camera)
// 加载环境贴图
const cubeMap=new THREE.CubeTextureLoader()
    .setPath( '/textures/environmentMaps/0/')
    .load( [
        'px.jpg',
        'nx.jpg',
        'py.jpg',
        'ny.jpg',
        'pz.jpg',
        'nz.jpg'
    ] );

const geometry = new THREE.SphereGeometry( 1, 32, 16 );
const material = new THREE.MeshStandardMaterial( {
  // 设置环境贴图
  envMap:cubeMap, 
  roughness:0,
  metalness:1 
} );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
// 设置场景背景
scene.background=cubeMap
// 给场景所有的物体添加默认的环境贴图
// scene.environment=cubeMap
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 阻尼效果
controls.enableDamping = true
// 渲染函数
function render() {
    renderer.render(scene, camera)
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}

render()
```

## 经纬线映射贴图与HDR

```js
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
//  创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// 设置相机位置
camera.position.set(3, 3, 3)
// 将相机添加到场景中
scene.add(camera)
// 加载hdr图像
const hdr_env= await new RGBELoader().loadAsync('/textures/hdr/002.hdr')
const geometry = new THREE.SphereGeometry( 1, 32, 16 );
const material = new THREE.MeshStandardMaterial( {   roughness:0,metalness:1 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
// 设置场景背景
scene.background=hdr_env
//经纬线映射贴图
hdr_env.mapping=THREE.EquirectangularReflectionMapping
// 给场景所有的物体添加默认的环境贴图
scene.environment=hdr_env
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 阻尼效果
controls.enableDamping = true
// 渲染函数
function render() {
    renderer.render(scene, camera)
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}
render()
```

## 纹理加载进度情况

使用`LoadingManager`对加载进度进行统一管理，传入`TextureLoader`

```js
/**
 * @description 注释精修版V2.0
 * @author Frank
 */
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// 进度条
let div=document.createElement('div')
    div.style.width='200px'
    div.style.height='50px'
    div.style.position='fixed'
    div.style.right='0'
    div.style.top='0'
    div.style.textAlign='right'
    div.style.color='white'
document.body.appendChild(div)
//  创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// 设置相机位置
camera.position.set(0, 0, 1.5)
// 将相机添加到场景中
scene.add(camera)
// 监控纹理加载情况
const manager = new THREE.LoadingManager();
manager.onLoad = function ( ) {
    console.log('贴图全部加载完成✅');
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    div.innerText=`${((itemsLoaded/itemsTotal)*100).toFixed(2)}%`
    console.log(`贴图加载进度:${((itemsLoaded/itemsTotal)*100).toFixed(2)}`)
    // console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
// 加载纹理
const doorTexture = new THREE.TextureLoader(manager).load('/textures/door/color.jpg')
// 透明贴图
const alphaTexture = new THREE.TextureLoader(manager).load('/textures/door/alpha.jpg')
// 环境遮挡纹理贴图
const aoTexture = new THREE.TextureLoader(manager).load('/textures/door/ambientOcclusion.jpg')
// 添加置换贴图
const doorHeightTexture=new THREE.TextureLoader(manager).load('/textures/door/height.jpg')
// 加载粗糙度贴图
const roughnessTexture=new THREE.TextureLoader(manager).load('/textures/door/roughness.jpg')
// 加载金属贴图
const metalnessTexture=new THREE.TextureLoader(manager).load('/textures/door/metalness.jpg')
// 创建平面几何体
const PlaneGeometry = new THREE.PlaneGeometry(1,1,100,100)
// aoMap必须设置第二组uv
PlaneGeometry.setAttribute('uv2', new THREE.BufferAttribute(PlaneGeometry.attributes.uv.array, 2))
// 创建材质
const material = new THREE.MeshStandardMaterial({
    map: doorTexture,
    alphaMap: alphaTexture,
    // 必须添加 选择一个alpha通道
    transparent: true,
    side: THREE.DoubleSide,
    aoMap: aoTexture,
    displacementMap:doorHeightTexture,
    displacementScale:0.07,
    aoMapIntensity: 1,
    // 默认为1 为完全漫反射
    roughness:1,
    // 粗糙度贴图
    roughnessMap:roughnessTexture,
    metalness:.7,
    metalnessMap:metalnessTexture,
})
// 创建物体
const plane = new THREE.Mesh(PlaneGeometry, material )
// 将平面添加到场景
scene.add(plane)
// 初始化渲染器
const renderer2 = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer2.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer2.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer2.domElement)
// 阻尼效果
controls.enableDamping = true
// 环境光
const light = new THREE.AmbientLight(0xffffff,1); // soft white light
// 添加环境灯光到场景
scene.add(light);
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 添加平行灯光到场景
scene.add(directionalLight)
// 设置平行光起始点 终点默认（0，0，0）
directionalLight.position.set(10,10,10)
// 渲染函数
function render() {
    renderer2.render(scene, camera)
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}
render()
```

