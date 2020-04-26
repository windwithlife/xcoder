

module.exports  =
{
    name: "xcomponent",
    remark:"页面组件",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "说明",show:'yes'},
        interfaces: {type: 'Long', dName: "用到公用接口", show:'M2MList', refer: {module:"xinterface",map:"ManyToMany"}},
        defineText: {type: 'String', dName: "页面代码",show:'text'},
        status: {type: 'int', dName: "页面状态",show:'select',refer:{module:'dictionary',map:"ManyToOne",category:"data_status"}}
    }
}