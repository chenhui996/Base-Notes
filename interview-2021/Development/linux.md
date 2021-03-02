# linux 命令

- 前端用到的 linux 常用命令。

---

- 公司的线上及其一般都是 linux （参考阿里云）。
- 测试机也需要保持一致，用 linux。
- 测试机或者线上机出了问题，本地又不能复现，需要去排查。

---

## 登陆线上机

- 会给你一个用户名：

```linux
ssh work@192.168.10.21
```

- 然后会让你输密码，输入后：
  - 成功登陆线上机。

---

- 查看文件夹：
  - ls
  - ls -a
  - ll （列表）
- 清屏：
  - clear
- 创建文件夹：
  - mkdir xxx
- 删除文件夹：
  - rm -rf xxx
- 进入目录：
  - cd xxx/xxx/xx
- 修改文件名：
  - mv oldName.xxx newName.xxx
- 移动文件位置：
  - mv name.xx ../../name.xx
- 拷贝：
  - cp a.js a1.js
- 新建文件：
  - touch xx.js
  - vi d.js (新建并且打开)
- 查看文件内容：
  - cat xx.js
  - head xx.js (开头部分)
  - tails xx.js (末尾部分)
- 查找关键字：
  - grep "xxxx" xx.js
