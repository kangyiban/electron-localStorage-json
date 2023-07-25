# electron-localstorage-json
在eletron主线程也能使用的localStorage


主要解决electron主进程中获取不到浏览器的window对象的，不能像在渲染进程中一样使用浏览器为我们提供的localstorage对象。


于是手动封装了一个可以在主进程中调用的localstorage。

# 1.安装

```
npm install electron-localstorage-json
```
# 2.引用：
```
const storage = require('electron-localstorage-json');
```

# 3.使用

## 3.1完美支持所有类似localStorage的所有api：

存储数据
```
storage.setItem(`myCat`, `Tom`);
```
获取数据
```
let cat = storage.getItem(`myCat`);
```
移除某个数据
```
storage.removeItem(`myCat`);
```
移除所有数据
```
storage.clear();
```

## 3.2 扩展方法

获取当前所有存储的项
```
storage.getAll();
```
自定义存储路径
```
文件存储路径不包括文件名
storage.setStoragePath(path.join(__dirname));
```
获取当前数据存储路径
```
storage.getStoragePath();
```

# 4.示例程序

https://github.com/ConardLi/electron-localstorage-demo
