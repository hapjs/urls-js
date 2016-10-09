/**
 * author: mailhap@qq.com
 * update: 2016-10-09
*/

; (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.urls = factory();
    }
} (this, function () {
    'use strict';

    // extend object
    var extend = function () {
        var args = arguments, deep = false, dest;
        if (typeof args[0] === 'boolean') {
            deep = Array.prototype.shift.call(args);
        };
        dest = Array.prototype.shift.call(args);
        Array.prototype.forEach.call(args, function (src) {
            Object.keys(src).forEach(function (key) {
                if (deep && typeof src[key] === 'object' && typeof dest[key] === 'object') {
                    extend(true, dest[key], src[key]);
                } else if (typeof src[key] !== 'undefined') {
                    dest[key] = src[key];
                };
            });
        });
        return dest;
    };

    // url处理
    var urls = {

        // 把url字符串解析为对象
        parse: function (url) {
            var query = {}, hash = {};

            // 把 url 分隔成3段：path, query, hash
            url = (url || location.href).split(/\?|\#/);

            // 解析 query
            (url[1] || '').split('&').forEach(function (n) {
                if (!n[0]) return;
                n = n.split('=');
                query[n[0]] = n[1] || '';
            });

            // 解析 hash
            (url[2] || '').split('&').forEach(function (n) {
                if (!n[0]) return;
                n = n.split('=');
                hash[n[0]] = n[1] || '';
            });

            url = {
                path: url[0],
                query: query,
                hash: hash
            };

            url.toString = function () {
                return urls.stringify(this);
            };

            return url;
        },

        // 把url对象拼接为字符串
        stringify: function (cfg) {
            var s = cfg.path, query = [], hash = [];

            // 拼接query
            if (cfg.query) {
                Object.keys(cfg.query).forEach(function (n) {
                    if (cfg.query[n]) {
                        query.push(n + '=' + cfg.query[n]);
                    } else {
                        query.push(n);
                    }
                });
                if (query.length) {
                    s += '?' + query.join('&');
                };
            };

            // 拼接hash
            if (cfg.hash) {
                Object.keys(cfg.hash).forEach(function (n) {
                    if (cfg.hash[n]) {
                        hash.push(n + '=' + cfg.hash[n]);
                    } else {
                        hash.push(n);
                    }
                });
                if (hash.length) {
                    s += '#' + hash.join('&');
                };
            };

            return s;
        },

        // 合并两个url对象，并返回url字符串
        merge: function (dest, src) {

            if (typeof dest === 'string') {
                dest = urls.parse(dest);
            };

            if (typeof src === 'string') {
                src = urls.parse(src);
            };

            if (!src.path) {
                delete src.path;
            };

            return extend(true, dest, src).toString();
        },
    };

    return urls;
}));