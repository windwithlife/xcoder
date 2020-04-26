

module.exports  =
{
    name: "pxinterface",
    remark:"页面接口",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "说明",show:'yes'},
        defineText: {type: 'String', dName: "页面接口定义",show:'text'},
        status: {type: 'int', dName: "页面状态",show:'select',refer:{module:'dictionary',map:"ManyToOne",category:"data_status"}}
    }
}