exports.logInfo = function (topic, value) {
    console.log("/********************** The Begin of " + topic + '**********************/')
    console.log(value);
    console.log("/**********************  The End of " + topic + '**********************/');
}
exports.log = function (value) {
    console.log('/********************** The Begin ***************************/')
    console.log(value);
    console.log('/**********************  The End **********************/');
}

exports.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;

}