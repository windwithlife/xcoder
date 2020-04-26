

module.exports  =
{
    name: "indexfutures",
    remark:"全球股指期货实时数据",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "说明",show:'yes'},
        vmonth: {type: 'String', dName: "期货月份",show:'yes'},
        vbefore: {type: 'String', dName: "前值",show:'yes'},
        vlast: {type: 'String', dName: "最新的值",show:'yes'},
        vhigh: {type: 'String', dName: "最高的值",show:'yes'},
        vlow: {type: 'String', dName: "最低的值",show:'yes'},
        vchange: {type: 'String', dName: "值变化",show:'yes'},
        vchangep:{type: 'String', dName: "值变化百分比",show:'yes'},
        vtime: {type: 'String', dName: "值变化时间",show:'yes'},
        tday: {type: 'String', dName: "当天技术分析",show:'yes'},
        tweek: {type: 'String', dName: "本周技术分析",show:'yes'},
        futureType: {type: 'String', dName: "期货类型",show:'yes'}

    }
}