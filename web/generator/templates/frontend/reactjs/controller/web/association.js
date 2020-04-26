import React from 'react';
import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Form,
    Select,
    Input
} from 'antd';
//import EditableCell from '../common/components/form/editablecell.js';
//import NewModal from './components/modal.js';
import router from 'next/router';
import Layout from '../common/pages/layout';
import '../common/styles/TableSearch.less';





const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
},
onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
},
onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
},
};


class ListExample extends React.Component{


    state = {
        list: [],
        count:0,
        searchText:'',
        parentId:this.props.query.parentId,

    }
    startHeader() {
        var that = this;
        var fieldColumns=[];
        var fieldColumnsAssociation=[];
    <%
        for (var field in data.moduleDefine){
            var fieldDisplayName = data.moduleDefine[field].dName;
            var fieldShow = data.moduleDefine[field].show;
            if (fieldShow=="yes"){
            %>
                fieldColumns.push({
                    title: "<%=fieldDisplayName%>",
                    dataIndex: '<%=field%>',
                    key: '<%=field%>'
                });
                fieldColumnsAssociation.push({
                    title: "<%=fieldDisplayName%>",
                    dataIndex: '<%=field%>',
                    key: '<%=field%>'
                });
            <%}}%>



        this.columns = [ ...fieldColumns, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
        <a href = "#" onClick = {that.handleLineRemove.bind(that,index,record)} > 删除此项关联 </a>
)
}];

this.columnsAssociation = [ ...fieldColumnsAssociation, {
    title: 'Action',
    key: 'action',
    render: (text, record, index) => (
<span >
<a href = "#" onClick = {that.handleLineAdd.bind(that,index,record)} > 添加此项关联 </a>
<span className = "ant-divider" />
    <a href = "#" onClick = {that.handleLineDetail.bind(that,record)} > 详细数据 </a>
</span>
)
}];


}

onFooterBack(){
    console.log('onback');
    router.back();
}


componentWillMount() {
    var that = this;
    var associationName = this.props.query.associationName;
    var referModuleName = this.props.query.referModule;
    var moduleId  = this.props.query.<%=data.moduleName%>Id;

    var moduleField = "<%=data.moduleName%>Id";
    this.startHeader();

    model.queryReferListBy(associationName,moduleField,{id:moduleId},function(response){
        if (response && response.data) {
            console.log(response.data);
            response.data.map(function(item, i) {
                item.key = item.id
            });
            that.setState({
                list: response.data
            });

        }
    });


    var referModulePath = referModuleName +"/queryAll";
    model.queryRaw(referModulePath,{},function (response) {
            if (response && response.data) {
                console.log(JSON.stringify(response.data));
                console.log(response.data);
                response.data.map(function(item, i) {
                item.key = item.id
            });
            that.setState({
                listAssociation: response.data
            });
    }});

}

pagination() {
    return {
            total: this.state.list.length,
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
            console.log('Current: ', current, '; PageSize: ', pageSize);
},
onChange: (current) => {
    console.log('Current: ', current);
},
};
}

handleLineDetail(record) {
    let that = this;

    this.state.currentItem = record;
    router.push({pathname:'/<%=data.moduleName%>/detail',query:{...that.props.query,<%=data.moduleName%>Id:record.id}});


}
handleLineDetailModal(record) {

    this.state.currentItem = record;
    this.setState({
        visible: true
    });

}

handleLineAdd(index, record) {
    var that = this;
    var realNew = true;
    var associationName = this.props.query.associationName;
    var referModuleName = this.props.query.referModule;
    var moduleId  = this.props.query.<%=data.moduleName%>Id;
    var moduleField = "<%=data.moduleName%>Id";

    var associationPath = associationName +"/save";

    const dataSource = [...that.state.list];
    var dataSourceA = [...that.state.listAssociation];
    dataSource.map(function(item,i){
        if (record.id == item.id){
            realNew = false;
        }
    })
    if (realNew == false){return};

    var params = {id:0};
    params[moduleField] = moduleId;
    params[referModuleName+"Id"] = record.id;
    params["name"] = record.name;
    model.postRaw(associationPath,params, function(response) {
        if (response && response.data) {
            console.log('sucessful to add one new recod');
            let r = response.data;
            r.name = record.name;
            r.key  = response.id;
            dataSource.push(r);
            dataSourceA.splice(index, 1);

            that.setState({
                list: dataSource,
                listAssociation:dataSourceA
            });
        }
    });



}
handleLineRemove(index, record) {
    var that = this;
    var associationName = this.props.query.associationName;
    var referModuleName = this.props.query.referModule;


    var associationPath = associationName +"/remove/"+record.id;

    model.postRaw(associationPath,record, function() {
        console.log('successful to remove: ID:' + record.id);
        const dataSource = [...that.state.list];
        dataSource.splice(index, 1);

        var dataSourceA = [...that.state.listAssociation];
        var existedItem = false;
        dataSourceA.map(function(item,i){
            if (record[referModuleName+"Id"]== item.id){
                existedItem = true;
            }
        })
        if (existedItem == false){
            var newRecord = {id:record[referModuleName +"Id"]};
            newRecord.name = record.name;
            newRecord.key  =  referModuleName +newRecord.id;
            dataSourceA.push(newRecord);
        }
        that.setState({
            list: dataSource,
            listAssociation:dataSourceA
        });
    });



}

handleCancelUpdate(e) {
    //e.preventDefault();
    this.setState({
        visible: false
    });
}

handleSearchChange(e){
    console.log("search text;" + e.target.value);
    this.setState({searchText: e.target.value,name: e.target.value});
}
handleSearch(e) {
    e.preventDefault();
    console.log("begin to send search2...");
    var that = this;

    const data = {keywork: this.state.searchText};
    console.log(JSON.stringify(data));
    that.executeSearch(data);

}
executeSearch(param) {
    var that = this;
    model.queryByNameLike(param.keyword,function(response){
        if (response&& response.data) {
            console.log(JSON.stringify(response.data));
            response.data.map(function(item, i) {
                item.key = item.id;
            });
            that.setState({
                list: response.data
            });
        }
    });

}
render() {
    var that = this;

    return (
        <div >
        <div>
            <Table  rowSelection = {rowSelection} columns= {this.columns} dataSource = {this.state.list}
                pagination = {this.pagination()} bordered title = {() => (<div>主表</div>)}
            />
        </div>
        <div>
            <div>
                < Form layout="inline" onSubmit = {this.handleSearch.bind(this)} >
                < Form.Item  >
                    <Input type = "text" onChange={this.handleSearchChange.bind(this)} />
                < /Form.Item>
                < Form.Item  >
                    < Button style = {{marginRight: '10px'}} type = "primary" htmlType = "submit" > 搜索 </Button>
                < /Form.Item>
                < /Form>
            </div>
            <Table  bordered rowSelection = {rowSelection} columns = {this.columnsAssociation} dataSource = {this.state.listAssociation}
                pagination = {this.pagination()} title = {() => (<div>关联表</div>)}
                footer = {() => (<Button onClick={that.onFooterBack.bind(that)}>确定</Button>)}
            />

        </div>
    </div>
);
}

}



export default class Page extends React.Component{

    render(){
        return (<ListExample query={this.props.query}/>)
}
}
Page.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}
//export default()=>(<Layout> <ListExample/></Layout>)