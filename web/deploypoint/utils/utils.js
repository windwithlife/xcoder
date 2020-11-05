
function change(t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}

function getDatetime() {
    var d = new Date();
    var year = d.getFullYear();
    var month = change(d.getMonth() + 1);
    var day = change(d.getDate());
    var hour = change(d.getHours());
    var minute = change(d.getMinutes());
    var second = change(d.getSeconds());   

    var time = year  + month  + day + '-' 
            + hour + minute + second;
    return time;
}


function removeFirst(str) {
    let  result = str;
    if(!str){return ''}
    if(str.substring(0,1) == '/'){
        result =  str.substring(1);
    }
    
    return result;
}

function changeDomainFormat(str) {
    let  result = str;
    str.map(function(charElement,i){
        if ('.' == charElement){
            //result.replace(i,)
        }
    })
   
    
    return result;
}


export default {
    getNowDateString:getDatetime,
    removeFirst:removeFirst,


}




