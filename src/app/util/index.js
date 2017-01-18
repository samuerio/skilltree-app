export function forEach(obj, context){
    if(Array.isArray(obj)){
        obj.forEach(context);
    }else{
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                context(obj[key]);
            }
        }
    }
}

export function count(obj){
    if(Array.isArray(obj)){
        return obj.length;
    }else{
        let c = 0;
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                c++;
            }
        }
        return c;
    }
}