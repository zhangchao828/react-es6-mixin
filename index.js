function inject(mixinFun,component){
    let mixinObj=mixinFun(component);
    let keys=Object.keys(mixinObj);
    let keysLen=keys.length;
    for(let i=0;i<keysLen;i++){
        let key=keys[i];
        if(!key.startsWith('$')){
            key==='getInitialState'?
                component.state=mixinObj[key]():
                component[key]=mixinObj[key];
        }
    }
}
function mixin(component,mixins=[]){
    if(typeof mixins==='function'){
        inject(mixins,component);
    }else{
        //Object.prototype.toString.call(mixins) ==='[object Array]'
        let count=mixins.length;
        for(let i=0;i<count;i++){
            inject(mixins[i],component);
        }
    }
}
module.exports = mixin;