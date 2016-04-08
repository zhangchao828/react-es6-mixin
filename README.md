react-es6-mixin
=========
##for example
####./Test.jsx
    import React,{Component} from 'react';
    import mixin from 'mixin';
    import {shouldUpdate} from './shouldUpdate';
    class Test extends Component{
        constructor(props){
            super(props);
            this.state={test:1}
            //or mixin(this,[shouldUpdate,.....])
            mixin(this,shouldUpdate);
        }
        handlerClick(){
            alert(this.refs.input.value);
        }
        render(){
            return(
                <button onClick={()=>this.handlerClick()}>get the title<button>
                <input ref='input' value='title'/>
            )
        }
    }
####./shouldUpdate.jsx
    import {is} from 'immutable';
    export default component=>({
        shouldComponentUpdate(nextProps = {}, nextState = {}){
            const thisProps = component.props || {}, thisState = component.state || {};
            if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
                Object.keys(thisState).length !== Object.keys(nextState).length) {
                return true;
            }
            for (const key in nextProps) {
                if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
                    return true;
                }
            }
            for (const key in nextState) {
                if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
                    return true;
                }
            }
            return false;
        },
        getInitialState(){
            return {
               test: component.props.test || 1
            }
        },
        handlerClick(){
            alert(this.refs.input.value);
        }
    })
     
   