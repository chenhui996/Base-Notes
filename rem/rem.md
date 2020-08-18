# rem 做响应式

- 本人一直从事于官网搭建，对于响应式，也踩了许多坑，这里，本人来整理一套响应式的终极解决方案;
- 那就是用：@media 配合 rem 实现，全民 rem;
- 与 mvvm 设计模式类似，咱们可以把 body 这个根元素当成数据源:
  - 预先用@media 设置好各个尺寸下的 body 样式;
  - 每次只修改 body 的预定样式，影响到全局;
  - 但是一些适配中个性化排版，那还是只能单独调整;
- 核心：所有单位的数据，都是 body 的 font-size 衍生;
  - 比较复杂的是，所有单位的数据，都要经过 body 的 font-size 的数据的换算;

## @media

- 用法：

```css
@media screen and (width:xxxxpx){
    body{
        font-size:xxpx;
    }
}
```
