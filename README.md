# urls-js
轻量级url参数处理，兼容浏览器和Node.js环境

## 引用

```js
var urls = require('urls');
```

或

```html
<script src="urls.min.js"></script>
```

## urls.parse() 解析

假设当前页面 url 为 http://baidu.com?a=1&b=2#c=3
```js
urls.parse().query; // ==> { a: '1', b: '2' }
urls.parse().hash;  // ==> { c: '3' }
```

```js
urls.parse('?a=3&b=4').query;                // ==> { a: '3', b: '4' }
urls.parse('page/index.html?a=3&b=4').query; // ==> { a: '3', b: '4' }
urls.parse('http://localhost/page/index.html?a=3&b=4').query; // ==> { a: '3', b: '4' }
```

## urls.stringify() 拼接

```js
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

## urls.merge() 合并

```js
var url1 = 'page/index.html?a=1&b=2#c';
var url2 = '?b=3';

urls.merge(url1, url2);  // ==> page/index.html?a=1&b=3#c

urls.merge(url1, {
    query: {
        b: 3
    }
});  // ==> page/index.html?a=1&b=3#c
```
