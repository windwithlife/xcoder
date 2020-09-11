
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


// module.exports = {
//         getNowDateString:getDatetime,
// }
export default {
    getNowDateString:getDatetime,
}




