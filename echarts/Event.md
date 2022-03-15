# 事件与行为

- 在 Apache ECharts 的图表中:
  - 用户的 **操作** 将会 **触发相应的事件**.
  - **开发者** 可以:
    - **监听** 这些 **事件**.
    - 然后通过 **回调函数** 做相应的处理:
      - 如跳转地址.
      - 如弹出对话框.
      - 如数据下钻.
      - 等等.
- ECharts 中的 **事件名称**:
  - 对应 **DOM 事件名称**.
  - 均为 **小写** 的字符串.
  - 如下, 是一个 **绑定点击操作** 的示例:
  
```js
const myChart = echarts.init(node); // node: dom 节点

myChart.on('click', function(params) {
  // 控制台打印数据的名称
  console.log(params.name);
});
```

- 在 ECharts 中 **事件** 分为 **两种类型**:
  - **一种是**:
    - 用户 **鼠标操作** 点击.
    - 或者 **hover 图表** 的 **图形** 时 **触发的事件**.
  - **还有一种**:
    - 用户在使用 **可以交互的组件** 后, 触发的 **行为事件**:
      - 例如在 **切换图例开关** 时触发的 ```legendselectchanged``` 事件.
      - 数据区域缩放时触发的 ```datazoom``` 事件.
      - 等等.

> 这里需要注意: **切换图例开关** 是 **不会触发** ```legendselected``` 事件的.

---

## 鼠标事件的处理

- ```ECharts``` 支持 **常规的鼠标事件类型**:
  - 'click'
  - 'dblclick'
  - 'mousedown'
  - 'mousemove'
  - 'mouseup'
  - 'mouseover'
  - 'mouseout'
  - 'globalout'
  - 'contextmenu'

> 下面先来看一个, 简单的 **点击柱状图后**, 打开 **相应的百度搜索页面** 的示例:

```js
// 基于准备好的dom，初始化ECharts实例
// var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

// 处理 点击事件 并且 跳转到 相应的 百度搜索页面
myChart.on('click', function(params) {
  window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
});
```

> encodeURIComponent: mdn: 转译 url.

所有的 **鼠标事件** 包含参数 ```params```, 如下是 **一个包含点击图形** 的 **数据信息的对象**, 如下格式:

```ts
type EventParams = {
  // 当前 点击的图形元素 所属的 组件名称，
  // 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。
  componentType: string;
  // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。
  seriesType: string;
  // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。
  seriesIndex: number;
  // 系列名称。当 componentType 为 'series' 时有意义。
  seriesName: string;
  // 数据名，类目名
  name: string;
  // 数据在传入的 data 数组中的 index
  dataIndex: number;
  // 传入的原始数据项
  data: Object;
  // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data，
  // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。
  // 其他大部分图表中只有一种 data，dataType 无意义。
  dataType: string;
  // 传入的数据值
  value: number | Array;
  // 数据图形的颜色。当 componentType 为 'series' 时有意义。
  color: string;
};
```

- 如何区分 **鼠标点击到了哪里**:

```js
myChart.on('click', function(params) {
  if (params.componentType === 'markPoint') {
    // 点击到了 markPoint 上
    if (params.seriesIndex === 5) {
      // 点击到了 index 为 5 的 series 的 markPoint 上。
    }
  } else if (params.componentType === 'series') {
    if (params.seriesType === 'graph') {
      if (params.dataType === 'edge') {
        // 点击到了 graph 的 edge（边）上。
      } else {
        // 点击到了 graph 的 node（节点）上。
      }
    }
  }
});
```

- 使用 ```query``` 只对, **指定的** 组件的 **图形元素** 的**触发回调**:

```js
chart.on(eventName, query, handler);
```

- ```query``` 可为 ```string``` 或者 ```Object```。
    - 如果为 ```string``` 表示组件类型.
      - 格式可以是 ```mainType``` 或者 ```mainType.subType```, 例如:

```js
chart.on('click', 'series', function() {});
chart.on('click', 'series.line', function() {});
chart.on('click', 'dataZoom', function() {});
chart.on('click', 'xAxis.category', function() {});
```

- 如果为 ```Object```，可以包含 **以下一个或多个属性**，每个属性都是可选的：

```js
{
  ${mainType}Index: number // 组件 index
  ${mainType}Name: string // 组件 name
  ${mainType}Id: string // 组件 id
  dataIndex: number // 数据项 index
  name: string // 数据项 name
  dataType: string // 数据项 type，如关系图中的 'node', 'edge'
  element: string // 自定义系列中的 el 的 name
}
```

如：

```js
chart.setOption({
  // ...
  series: [
    {
      name: 'uuu'
      // ...
    }
  ]
});

chart.on('mouseover', { seriesName: 'uuu' }, function() {
  // series name 为 'uuu' 的系列中的图形元素被 'mouseover' 时，此方法被回调。
});
```

```js
hart.setOption({
  // ...
  series: [
    {
      // ...
    },
    {
      // ...
      data: [
        { name: 'xx', value: 121 },
        { name: 'yy', value: 33 }
      ]
    }
  ]
});

chart.on('mouseover', { seriesIndex: 1, name: 'xx' }, function() {
  // series index 1 的系列中的 name 为 'xx' 的元素被 'mouseover' 时，此方法被回调。
});
```

```js
chart.setOption({
  // ...
  series: [
    {
      type: 'graph',
      nodes: [
        { name: 'a', value: 10 },
        { name: 'b', value: 20 }
      ],
      edges: [{ source: 0, target: 1 }]
    }
  ]
});

chart.on('click', { dataType: 'node' }, function() {
  // 关系图的节点被点击时此方法被回调。
});

chart.on('click', { dataType: 'edge' }, function() {
  // 关系图的边被点击时此方法被回调。
});
```

```js
chart.setOption({
  // ...
  series: {
    // ...
    type: 'custom',
    renderItem: function(params, api) {
      return {
        type: 'group',
        children: [
          {
            type: 'circle',
            name: 'my_el'
            // ...
          },
          {
            // ...
          }
        ]
      };
    },
    data: [[12, 33]]
  }
});

chart.on('mouseup', { element: 'my_el' }, function() {
  // name 为 'my_el' 的元素被 'mouseup' 时，此方法被回调。
});
```

- 你可以在 **回调函数** 中: 
  - 获得这个对象中的 **数据名、系列名称** 后:
    - 在自己的 **数据仓库中索引** 得到 **其它的信息** 后:
      - **更新图表**
      - **显示浮层**
      - 等等
    - 如下示例代码:

```js
// 打接口
myChart.on('click', function(parmas) {
  $.get('detail?q=' + params.name, function(detail) {
    myChart.setOption({
      series: [
        {
          name: 'pie',
          // 通过饼图表现单个柱子中的数据分布
          data: [detail.data]
        }
      ]
    });
  });
});
```

---

## 组件交互的行为事件

- 在 ```ECharts``` 中基本上, 所有的 **组件交互行为** 都会 **触发相应的事件**.
  - 常用的事件和事件对应参数在 events 文档中有列出, 链接:
    - https://echarts.apache.org/zh/api.html#events
  - 下面是监听一个图例开关的示例:

```js
// 图例开关的行为只会触发 legendselectchanged 事件
myChart.on('legendselectchanged', function(params) {
  // 获取点击图例的选中状态
  var isSelected = params.selected[params.name];
  // 在控制台中打印
  console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name);
  // 打印所有图例的状态
  console.log(params.selected);
});
```

---

## 代码触发 ECharts 中组件的行为

- 上面提到诸如 ```legendselectchanged``` 事件会由 **组件交互的行为** 触发.
- 那除了 **用户的交互操作**，有时候也会有: 需要在 **程序里调用方法** 触发图表的行为.
  - 诸如显示 tooltip.
  - 选中图例.
- 在 ```ECharts``` 通过调用 ```myChart.dispatchAction({ type: '' })``` 触发图表行为.
  - 其 **统一管理** 了所有动作，也可以方便地根据需要去 **记录用户的行为路径**.

> 常用的 **动作和动作对应参数** 在 action 文档中有列出, 链接: https://echarts.apache.org/zh/api.html#action

下面示例演示了如何通过 ```dispatchAction``` 去轮流高亮饼图的每个扇形:

```js
const option = {
  title: {
    text: '饼图程序调用高亮示例',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

let currentIndex = -1;

setInterval(function() {
  var dataLen = option.series[0].data.length;
  // 取消之前高亮的图形
  myChart.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: currentIndex
  });
  currentIndex = (currentIndex + 1) % dataLen;
  // 高亮当前图形
  myChart.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: currentIndex
  });
  // 显示 tooltip
  myChart.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: currentIndex
  });
}, 1000);
```

---

## 监听“空白处”的事件

- 有时候，开发者需要监听画布的“空白处”所触发的事件.
  - 比如，当需要在用户点击“空白处”的时候重置图表时.

> 在讨论这个功能之前，我们需要先明确两种事件。```zrender``` 事件和 ```echarts``` 事件.

```js
myChart.getZr().on('click', function(event) {
  // 该监听器正在监听一个`zrender 事件`。
});
myChart.on('click', function(event) {
  // 该监听器正在监听一个`echarts 事件`。
});
```

- zrender 事件与 echarts 事件不同.
  - 前者是, 当 **鼠标在任何地方** 都会被 **触发**.
  - 后者是, **只有** 当 **鼠标在图形元素上时** 才能被触发.
    - 事实上，```echarts``` 事件是在 ```zrender``` 事件, 的基础上实现的.
    - 也就是说，当一个 ```zrender``` 事件, 在图形元素上被触发时，echarts 将触发一个 echarts 事件给开发者.
- 有了 zrender 事件，我们就可以 **实现监听空白处** 的 **事件**, 具体如下:

```js
myChart.getZr().on('click', function(event) {
  // 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。
  if (!event.target) {
    // 点击在了空白处，做些什么。
  }
});
```

