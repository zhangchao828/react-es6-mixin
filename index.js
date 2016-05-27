(function(){
    'use strict';
    var inject=function inject(mixinFun,component){
        var mixinObj=mixinFun(component);
        var keys=Object.keys(mixinObj);
        var keysLen=keys.length;
        for(var i=0;i<keysLen;i++){
            var key=keys[i];
            key==='getInitialState'?
                component.state=mixinObj[key]():
                component[key]=mixinObj[key];
        }
    }
    var mixin=function minxin(component,mixins){
        if(typeof mixins==='function'){
            inject(mixins,component);
        }else{
            var count=mixins.length;
            for(var i=0;i<count;i++){
                inject(mixins[i],component);
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
}());