# 组件库的难点

## Upload 组件难点

- **如何打开本地文件列表：**
  - input 的 type 为 file
    - 用 useRef 将 input 节点缓存。
  - 给触发元素一个 onClick 事件，触发拿到 用 useRef 存起来的 input 节点。
    - 取到 input 节点，然后触发 fileInput.current.click()，打开本地文件列表。
- **如何取到选择的文件：**
  - 给 input 元素 一个 onChange 事件，触发取到 input 节点对象 e。
    - 取到 e，然后再取 e.target.files。
      - 最后选择 files[0]，即为第一个选中文件。（看完吓一跳后回来看，其实这一步可省略）
        - 若是想上传多个文件，用 forEach 分别创建多个 FormData，做相同操作上传即可。（可以同一写成函数）
- **如何将文件传给 axios，让其异步上传至服务端。**
  - 用 new FormData() 初始实例化文件对象
    - 用 append API ，将 '文件名称' 和 '文件本身' 当做参数传给 FormData。
      - 最后用 axios 的 post 方法上传数据。
- **实现逻辑**
  - 先实现最基本功能，再慢慢扩充其他需求。
- **如何拿到文件上传状态**
  - axios 下的 onUploadProgress：
    - 拿到的 e 对象，即为此刻的对象上传状态。
      - 然后可以通过 e.loaded 和 e.total 来计算百分比。
        - 且还可以继续实现各个生命周期函数。
          - 就是用 then 和 catch 分别调用 成功 和失败状态。
- **上传前进行文件验证**
  - 文件大小和重命名进行验证，不满足规则则不上传。
    - 两种验证：
      - 大小。
      - 重命名。
- **文件都是异步上传，如何实时获取文件上传百分比**
  - 其实本质就是 update 文件，每次只改 百分比的值。
    - useState 给回调函数，拿到上一次的数据状态。
      - 返回新状态，其中 百分比 是新状态的更改。

---

## 怎样选择 javascript 模块格式？

### UMD（Universal Module Definition）

- 在浏览器中就可以直接使用的格式。
- 推出是想形成一套通用的 Javascript 模块格式。
  - 兼容 AMD、CommonJS、浏览器。
    - 本质：
      - 检测到 define ———— 判断为 AMD。
      - 检测到 exports ———— 判断为 CommonJS。
      - 否则，则为浏览器。
    - 然后，将所有文档挂载到 windows 上。
      - 这样，浏览器就可以使用了。

## Rollup.js

### ES6 modules 与 tree shaking

- 运用了 tree shaking 技术：
  - 摇树
    - 细粒度的引入 模块中导出的内容。
      - 只打包引用到的模块，没有引用到的 '方法或模块'
        - 就不会被打包到 '最终实现的代码' 中去。

---

- 而我们用 create-react-app 创建的项目，自带了 Es6 modules 这种机制。
  - 也内含了 tree-shaking 机制。
- 所以当用户下载 eggd 进行使用，打包时，只要没用到的组件或方法。
  - 就因为 tree-shaking 技术，不会被打包进去。
    - 所以这就解决了：
      - 用户下载使用 eggd，打包后代码体积过大的问题。

> 所以，这一块无需我过多的做处理。基本都是自带。
> 我做处理主要的还是：将自己用 ts 写的这些代码，转成 es6 modules。

## 组件库 ts 代码 转行成 ES6 Modules。

- 中转导出。
  - 从其他文件，拿到模块，然后再导出。（只做导入导出的操作）

## 将 子组件 作为 组件的一个方法调用

```ts
import { FC } from "react";
import Menu, { MenuProps } from "./menu";
import SubMenu, { SubMenuProps } from "./subMenu";
import MenuItem, { MenuItemProps } from "./menuItem";

// 创建交叉类型
export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};

const TransMenu = Menu as IMenuComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
```

## tsconfig.build.json

- tsconfig.build.json 配置注意点：
  - "declaration": true
    - 为每个 js 文件生成 `xx.d.ts` 文件。
      - 目的在于给使用者完整的 ts 类型定义。
  - "exclude": []
    - 数组内传入不想被 tsc 编译的文件。

## 解决下载组件库后 依赖版本 冲突的问题

- 解决下载组件库后 依赖版本 冲突的问题：
  - 例如 react 版本冲突。
- 解决：
  - "peerDependencies": {}
    - 传入的对象元素，即为使用条件。

```json
{
  "peerDependencies": {
    "react": ">= 16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```
