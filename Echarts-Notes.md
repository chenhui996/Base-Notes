# echart 学习笔记

- 本人在学习 echarts 的过程中，记录的学习笔记, 已上传至 github:
  - 地址:

## 使用流程：

### 引入 echarts

```js
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
```

### 创建容器

```html
<div id="main"></div>
```

### 初始化 echarts

```js
const mainDom = document.querySelector("#main");
const myChart = echarts.init(mainDom);
```

### 写配置项

```js
const option = {
  xAxis: {
    data: ["html", "css", "js"],
  },
  yAxis: {},
  series: {
    type: "bar",
    data: [30, 20, 40],
  },
};
```

- xAxis:
  - x 轴
- yAxis:
  - y 轴
- series:
  - 图表参数(类型、数据...);

---

## echarts 继续深入

### 双坐标轴

- 将 yAxis 设置成如下即可:

```js
const option = {
  ...
  yAxis: {},{}
  ...
};
```

- 然后 y 轴对应的各个具体 '参数''数值'，自行填入即可;

### loading 动画

- 加载中:

```js
myChart.showLoading();
```

- 加载完成后:

```js
myChart.hideLoading();
```

- showLoading 具体参数，可以自行查看文档:
  - 可以修改颜色、大小、显示内容等;

### 数据集

- 将所有数据存成一个 '数组对象';
  - 统一管理;
    - 需要用到调用即可(不零散添加 x、y 轴数据了)
- 例:

```js
// 定义数据集
const sourse = [
  ["大前端", "学习人数", "就业人数"],
  ["html", 30, 40],
  ["css", 20, 30],
  ["js", 40, 50],
];

// 配置echart
const option = {
  dataset: { sourse },
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
  series: {
    type: "bar",
  },
};
```

### 数据集对应的类目 seriesLayoutBy

- column:
  - 每项第一个元素，为 x 轴类目;
  - 其余为 y 轴数据;

```js
const option = {
  // ...
  series: {
    type: "bar",
    seriesLayoutBy: column,
  },
};
```

---

- row:
  - 数据集第一项为 x 轴类目,
  - 其余项为 y 轴数据(各项的第一个元素除外);

```js
const option = {
  // ...
  series: {
    type: "bar",
    seriesLayoutBy: row,
  },
};
```

---

- 总结:
  - 就类似表格的 '横向' 与 '纵向';

### dimensions

- 自行设置纬度信息;
  - 场景:
    - 后端数据不全(不符合 echarts 数据集的绘图格式，比方说缺了纬度信息)
      - 那么我们便可以自行绘制 '纬度信息':

```js
// 定义纬度信息
const dimensions = ["占位", "纬度1", "纬度2"];

// 配置echarts
const option = {
  // ...
  dataset: { sourse, dimensions },
};
```

### encode 编码映射

- 可设置输出的数据类型:
  - 当我们 series 只设置了一个图表对象:
    - 默认显示 '纬度 1' 的数据;
      - 但是我们想自行控制显示 '纬度项':
        - 即用到 encode 设置

```js
const dimensions = ["占位", "纬度1", "纬度2"];
const option = {
  // ...
  series: {
    type: "bar",
    encode: {
      x: 0,
      y: 2,
      seriesName: 2,
    },
  },
};
```

- 这样，就显示 '纬度 2' 的信息了;
- seriesName:
  - 选择图表显示的 '纬度名';

### 区域缩放 dataZoom

- 作用:
  - 概览整体, 观察细节;
- 区域缩放的方式:
  - 框选型:
    - 提供一个 '选框' 进行 '数据区域' 的 '缩放';
  - 内置型(inside):
    - 内置于 '坐标系' 中:
      - 用户可以在 '坐标系上' 进行:
        - 鼠标拖拽
        - 鼠标滚动
        - 手指滑动(触屏)来缩放
        - 漫游坐标系
  - 滑动条型(slider):
    - 单独 '滑动条':
      - 用户在 '滑动条上' 进行 '缩放' 或 '漫游';

```js
const option = {
  // ...
  dataZoom:{
      type: 'inside'
      start: 20, // 图表 起始 的点 单位:百分比
      end: 80 // 图表 结束 的点 单位:百分比
    }
};
```

- 内置和滚动一起上:

```js
const option = {
  // ...
  dataZoom: [
    {
      type: "inside",
    },
    {
      type: "slider",
    },
  ],
};
```

### 视觉映射 visualMap

- 作用:
  - 让项目的 '数据' 和 '颜色' 、 '大小' 等属性 '相关联';
- 方式一:
  - 连续型(渐变色系条):

```js
const option = {
  // ...
  visualMap: {
    type: "continuous",
    min: 2, // 以设置的 渐变色系条 为基础设置 起始 以及 结束 的 元素颜色区域;
    max: 92,
    calculable: true, // 拖拽 色系条 改变 颜色区间;
    // 也可以自行设置色系
    inRange: {
      symbolSize: [10, 50],
      color: ['#c70025', 'yellow', 'bule'];
    }
  },
};
```

---

- 方式二:
  - 分段型(按块进行划分，不连续):

```js
const option = {
  // ...
  visualMap: {
    type: "piecewise",
    min: 2, // 以设置的 渐变色系条 为基础设置 起始 以及 结束 的 元素颜色区域;
    max: 92,
    // 也可以自行设置色系
    inRange: {
      symbolSize: [10, 50],
      color: ['#c70025', 'yellow', 'bule'];
    }
  },
};
```

### 事件

#### on

- 作用:
  - 监听事件

```js
myChart.on("click", (opt) => {
  console.log(pot);
});
```

#### 其他事件

- 自行看文档吧，非常完整;
