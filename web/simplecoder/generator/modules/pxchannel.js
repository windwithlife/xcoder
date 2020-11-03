

module.exports  =
{
    name: "pxchannel",
    remark:"channel",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "说明",show:'yes'},
        modules: {type: 'Long', dName: "表字段", show:'M2MList', refer: {module:"xmodule",map:"OneToMany",mapField:"xmoduleId"}},
        projectId: {type: 'Long', dName: "所属项目", show:'select', refer: {module:'project',map:"ManyToOne",mapField:"yes"}},
        isenable: {type: 'int', dName: "是否使用",show:'select',refer:{module:'dictionary',map:"ManyToOne",category:"data_status"}}
    }
}