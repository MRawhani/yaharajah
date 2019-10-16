import camelCase from 'camel-case';

let instance = null;
export class Cacher{
    cache ={};
    constructor(){
        
        if(!instance){
            instance = this;
        }

        return instance;
    }
   
    
    isVlaueCached=(key)=>{
        
        return this.getCachedValue(key);
    }

    cachValue=(key, value)=>{
        this.cache[key] = value;
    }

    getCachedValue=(key)=>{
        debugger
        return this.cache[key];
    }
}