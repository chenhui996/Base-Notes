import { async } from 'regenerator-runtime';
import functions  from '../src/AxiosBtn.js';
test('fetchUser() 可以请求到一个含有name属性值为Leanne Graham的对象', () => {
  expect.assertions(1);
  return functions.fetchUser()
    .then(data => {
      expect(data.name).toBe('Leanne Graham');
    });
});

// 用async和await来精简异步测试
test('用async和await来精简异步测试', async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.address.street).toBe('Kulas Light');
});