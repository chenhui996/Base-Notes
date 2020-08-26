# TypeScript

- 推荐用 vscode 进行编译:
  - 因为 vscode 是基于 typescript 进行编译的;
- 默认情况下，ts 文件的后缀是:
  - draft.ts

## 将 ts 文件转换成 js 文件

- 在命令行输入：

```
$tsc index.ts
```

- 然后，目录下即生成一个新的.js 结尾的文件;

### --outDir

- 指定编译文件输出目录:

```
$tsc --outDir ./dist ./ts_kkb/exp1.ts
```

- 执行后:
  - exp1.js 文件，将会在./dist 文件夹下生成;

### --target

- 指定编译的代码版本:
  - 默认为 ES3;
  - 所以要用--target 进行代码版本控制;

```
$tsc --outDir ./dist --target es5 ./ts_kkb/exp1/ts
```

- 这样，代码编译后，将是基于 es5 版本的 js 代码文件;

### --watch

- 在监听模式下运行:
  - 当文件发生改变时，自动进行编译:

```
$tsc --outDir ./dist --target es5 --watch ./ts_kkb/exp1/ts
```

- 自动：可以理解成类似 nodemon 的自动化;

## 编译配置文件

- 每次编译都调用那么长的命令，太繁琐，所以 tsc 支持我们进行————编译配置文件

### tsconfig.json

- 所有配置文件，都直接在此文件下进行配置， 然后编译成一个命令，统一执行;

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "ES6",
    "watch": true
  },
  // include: 指定ts编译起效的目录
  // ** : 所有目录(包括子目录);
  // * : 所有文件，也可以指定类型文件;
  "include": ["./src/**/*"]
}
```

- 配置完成后，只需要在命令行输入：
  - tsc，即可运行;

### --project

- 使用--project 或-p 指定配置文件目录;
  - 默认是加载该目录下的 tsconfig.json 文件;
- 若配置文件不叫 tsconfig.json:

```
tsc -p ./configs/ts.json
```
