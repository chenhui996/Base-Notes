# Echarts 常用属性

> echarts 实例的属性。统统在 options 里面配置

```js
const options = {
    // ...
}
```

---

### title （标题）

- ```text```: 图表的名称.
- ```textStyle```: css样式.
- ```x```: 标题的位置.

```js
const options = {
    title: {
        text: 'ECharts 日常',//标题
        textStyle : {
            color: 'black',//标题颜色
            fontSize: '16'//标题大小
        },
        x : 'center'//x轴
    }
    // ...
}

option && myChart.setOption(option);
```

---

### lengend （切换组件图例）

- **图例**: 
  - 这里的 **图例** 要和:
    -  ```series``` 里面的 ```name``` 名字对应.
  - ```data``` 这里是 **不同图例** 的 **数组**.

```js
const options = {
    // ...
    legend: {
        data:['销量','产量'],
        top: '8%',
        itemWidth : 15,//图例的宽度
        itemHeight : 15//图例的高度
    },
    // ...
}

option && myChart.setOption(option);
```

---

### series（系列列表）

- 系列列表:
  - 每个系列 -> 通过 ```type``` 决定自己的 **图表类型**.
  - 属性:
    - ```name```: set other Echarts instance.
    - ```type```: set Echarts instance type.
    - ```barWidth```: set Echarts bar width.
    - ```data```: set Echarts instance data.

```js
const options = {
    // ...
    series: [
        {
            name: '销量',
            type: 'bar',//设置柱状图
            barWidth : 20,//设置柱状宽度
            emphasis: {
                focus: 'series' // 设置鼠标悬浮动效
            },
            data: [15,60, 86, 55, 55, 50]
        },
        {
            name: '产量',
            type: 'bar',//设置柱状图
            barWidth : 20,//设置柱状宽度
            emphasis: {
                focus: 'series' // 设置鼠标悬浮动效
            },
            stack: 'Ad', // 重叠渲染 "相同类型" 的 "图表实例". (本人目前仅在 "柱状图" 尝试.
            data: [10, 20, 30, 40, 50, 60]
        }
    ]
    // ...
}

option && myChart.setOption(option);
```

> ```series``` 一般写在 ```options``` 尾部.(这里为了方便联动 ```lengend``` 讲解，故提上来讲)

---

### color

 - 这里是改 ```series```里面的颜色.
   - 一一对应:
     - 第一个对应销量.
     - 第二个是产量.
     - 以此类推.

```js
const options = {
    // ...
    color: ['#a9abff','#ff8896'],
    // ...
}

option && myChart.setOption(option);
```

---

### grid (网格)

- 设置 ```echarts``` 四周的边距.

```js
const options = {
    // ...
    grid : {  //图表距离四周多少，相当于css中的padding
        top : '16%',
        left : '15%',
        bottom: '15%',
        right: '15%',
        containLabel: true // 类似 box-sizing
    },
    // ...
}

option && myChart.setOption(option);
```

---

### xAxis（x轴）

- **如果**: 
  - 有 ``data``` 的话, 就是 **有下标**.
- ```name```: 单位名称.

```js
const options = {
    // ...
    xAxis: {//x轴
        //name: '件',//加上单位
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    // ...
}

option && myChart.setOption(option);
```

---

### yAxis（y轴）

- **如果**: 
  - 有 ``data``` 的话, 就是 **有下标**.
- ```name```: 单位名称.

```js
const options = {
    // ...
    yAxis: {//x轴
        //name: '件',//加上单位
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    // ...
}

option && myChart.setOption(option);
```

---

### toolbox (工具包)

- 默认的工具, 有:
  - ```saveAsImage```: 下载图片.
  - ```restore```: 转换.
  - ```dataView```: 看数据格式.
  - 等等.

```js
const options = {
    // ...
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    // ...
}

option && myChart.setOption(option);
```

---

### tooltip (鼠标悬停提示)

```js
const options = {
    // ...
    tooltip: { //鼠标悬停提示
        trigger: 'axis',
        axisPointer: {
            type: 'cross' // 鼠标悬浮动效
        },
        //formatter : '{b}' 这里还可以自定义提示内容，可以写一个函数，具体可以看下api
    },
    // ...
}

option && myChart.setOption(option);
```









