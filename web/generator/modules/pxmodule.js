

module.exports  =
{
    name: "pxmodule",
    remark:"公共模块",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "说明",show:'yes'},
        pages: {type: 'Long', dName: "表字段", show:'M2MList', refer: {module:"pxpage",map:"OneToMany",mapField:"pageId"}},
        mytables: {type: 'Long', dName: "所用表", show:'M2Mlist', refer: {module:'pxtable',map:"ManyToMany"}},
        isenable: {type: 'int', dName: "是否使用",show:'select',refer:{module:'dictionary',map:"ManyToOne",category:"data_status"}}
    }
}