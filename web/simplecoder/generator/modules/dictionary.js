/**
 * Created by zhangyq on 2016/5/1.
 */

module.exports  =
{
    name: "dictionary",
    remark:"字典表-各种简单类型",
    fields: {
        id: {type: 'Long', dName: "编号"},
        name: {type: 'String', dName: "显示名称",show:'yes'},
        value: {type: 'String', dName: "对应定义值",show:'yes'},
        category: {type: 'int', dName: "字典类别", show:'select', refer: {module:"category",map:"ManyToOne"}}
           
    }
}