import arrayNum  from '../src/functions';

test('arrayNum的作用是可以测数组的长度', ()=>{
    expect(arrayNum(10)).toHaveLength(10);
});
test('getIntArray(3.3)应该抛出错误', () => {
    // 用getIntArrayWrapFn包装'将要被测试的函数';
    expect(() => {arrayNum(3.3)}).toThrow("我只接收整数，老哥");// toThrow里面若有错误信息，需要跟组件内抛出的错误信息匹配
  });

