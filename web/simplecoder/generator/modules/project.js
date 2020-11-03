

module.exports  =
{
    name: "project",
    remark:"项目",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "名称",show:'yes'},
        description: {type: 'String', dName: "说明",show:'yes'},
        channel: {type: 'Long', dName: "模块", show:'list', refer: {module:"pxchannel",map:"OneToMany",mapField:"myproject"}},
        website:{type: 'String', dName: "站点",show:'yes'},
        soaIp:{type: 'String', dName: "SOA地址",show:'yes'}
    }
}