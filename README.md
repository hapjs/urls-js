# urls-js
轻量级url参数处理，兼容浏览器和Node.js环境

## 引用
var urls = require('urls');


## urls.parse()

解析 url参数和 hash参数

假设当前页面 url 为 http://baidu.com?a=1&b=2#c=3
```
urls.parse().query; // ==> { a: '1', b: '2' }
urls.parse().hash;  // ==> { c: '3' }
```

## urls.stringify()

把对象转为url字符串
```
var url = {
    path: 'page/index.html',
    query: {
        a: 1,
        b: 2
    },
    hash: {
        c: ''
    }
};

urls.stringify(url);  // ==> page/index.html?a=1&b=2#c
```

## urls.merge()

合并url参数
```
var url1 = 'page/index.html?a=1&b=2#c';
var url2 = '?b=3';

urls.merge(url1, url2);  // ==> page/index.html?a=1&b=3#c

urls.merge(url1, {
    query: {
        b: 3
    }
});  // ==> page/index.html?a=1&b=3#c
```
