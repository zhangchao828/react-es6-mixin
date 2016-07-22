/*
 react-es6-mixin
 支持传入3中形式的mixin:
 1:函数，函数必须带有函数名，@mixin(function test(){})
 2:对象，@mixin({key:value})
 3:数组,每个数组项必须是一个合法(符合1,2规则)的mixin
 */
(function(){
    'use strict';
    function judgeTyle(obj){
        return Object.prototype.toString.call(obj)
    }
    function combineFunMixin(mixinFun,component) {
        var funName=mixinFun.name
        if(funName===''){
            throw new Error('确保你传入的mixin带有函数名')
        }
        component.prototype[funName]=mixinFun
    }
    function combineArrMixin(mixinArr,component) {
        for(var i=0,len=mixinArr.length;i<len;i++){
            mixin(mixinArr[i])(component)
        }
    }
    function combineObjMixin(mixinObj,component){
        Object.keys(mixinObj).forEach(function (key) {
            component.prototype[key]=mixinObj[key]
        })
    }
    function mixin(mixins){
        return function (component) {
            if(typeof mixins==='function'){
                combineFunMixin(mixins,component)
            }else if(judgeTyle(mixins)==='[object Array]'){
                combineArrMixin(mixins,component)
            }else if(judgeTyle(mixins)==='[object Object]'){
                combineObjMixin(mixins,component)
            }else{
                throw new Error('确定你传入的mixin是一个函数或对象或数组')
            }
        }
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = mixin;
    } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define('mixin', [], function () {
            return mixin;
        });
    } else {
        window.mixin = mixin;
    }
}())