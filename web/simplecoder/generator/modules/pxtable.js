

module.exports  =
{
    name: "pxtable",
    remark:"项目表定义",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "说明",show:'yes'},
        defineText: {type: 'String', dName: "表结构定义",show:'text'},
        status: {type: 'int', dName: "是否使用",show:'select',refer:{module:'dictionary',map:"ManyToOne",category:"data_status"}}
    }
}
