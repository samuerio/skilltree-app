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

export function newId() {
    var b = Math.random();
    var a = (b + new Date().getTime());
    return a.toString(16).replace(".", "")
}



/**
 * 判别对象是否为空
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObjet(obj){
    var result = true;
    for (var key in obj){
        if(obj.hasOwnProperty(key)){
            result = false;
            break;
        }
    }
    return result;
}