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
        <%
                for (var field in data.moduleDefine){
                    var fieldDisplayName = data.moduleDefine[field].dName;
                    var fieldShow = data.moduleDefine[field].show;
                    var fieldRefer =  data.moduleDefine[field].refer;

                    if ((fieldShow=="select")||(fieldShow=="yes")||(fieldShow=="image")){
                %>
                fieldColumns.push({
                  title: "<%=fieldDisplayName%>",
                  dataIndex: '<%=field%>',
                  key: '<%=field%>'
                });
                <%}}%>




        this.columns = [ ...fieldColumns, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span >
                    <a href = "#" onClick = {that.handleLineAdd.bind(that)} > Add </a>
                    <span className = "ant-divider" />
                    <Popconfirm title = "Sure to delete?" onConfirm = {that.handleLineDelete.bind(that,index, record)} >
                        < a href = "#" > Delete </a>
                    </Popconfirm>
                    <span className = "ant-divider" />
                    <a href = "#" onClick = {that.handleLineUpdate.bind(that,index, record)} > Update </a>
                    <span className = "ant-divider" />
                    <a href = "#" onClick = {that.handleLineDetail.bind(that,record)} > Detail </a>
                </span>
            )
        }];


    }

    onFooterBack(){

        <%if (data.isChildModule){%>
        router.replace({pathname:"/<%=data.parentModule%>/edit" ,query:this.props.query});
        <%}else{%>
        router.back();
        <%}%>
    }


componentWillMount() {
    var that = this;
    this.startHeader();
    <%if (data.isChildModule){%>
    if(this.props.query.<%=data.parentModule%>Id){
        model.queryReferListBy("<%=data.moduleName%>","<%=data.parentMapField%>",{id:this.props.query.<%=data.parentModule%>Id},function(response){
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
    }else{
        model.queryAll(function (response) {
            if (response && response.data) {
                console.log(JSON.stringify(response.data));
                console.log(response.data);
                response.data.map(function(item, i) {
                    item.key = item.id
                });
                that.setState({
                    list: response.data
                });
            }
        });
    }
    <%}else{%>

        model.queryAll(function (response) {
            if (response && response.data) {
                console.log(JSON.stringify(response.data));
                console.log(response.data);
                response.data.map(function(item, i) {
                    item.key = item.id
                });
                that.setState({
                    list: response.data
                });
            }
        });
    <%}%>
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
    handleLineUpdate(index, record) {
        let that = this;

        this.state.currentItem = record;
        this.state.currentItem.index = index;
        router.push({pathname:'/<%=data.moduleName%>/edit',query: {...that.props.query,<%=data.moduleName%>Id:record.id}});
        
      

    }
    handleLineDetail(record) {
        let that = this;

        this.state.currentItem = record;
        //this.state.currentItem.index = index;
        //console.log('record:' + record);
        //this.context.router.push({pathname:'/<%=data.endName%>/<%=data.moduleName%>/detail',state:{item:record}});
        router.push({pathname:'/<%=data.moduleName%>/detail',query:{...that.props.query,<%=data.moduleName%>Id:record.id}});


    }
    handleLineDetailModal(record) {

        this.state.currentItem = record;
        this.setState({
            visible: true
        });

    }

    handleLineAdd() {
        let that = this;
        //this.context.router.push({pathname:'/<%=data.endName%>/<%=data.moduleName%>/add'});
        router.push({pathname:'/<%=data.moduleName%>/add',query:{...that.props.query}});
    }
    handleLineDelete(index, record) {
        var that = this;
        model.removeById(record.id, function() {
            console.log('successful to remove: ID:' + record.id);
            const dataSource = [...that.state.list];
            dataSource.splice(index, 1);
            that.setState({
                list: dataSource
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
            < div >
            <div>
            < Form layout="inline" onSubmit = {this.handleSearch.bind(this)} >
                < Form.Item  >
                    <Input type = "text" onChange={this.handleSearchChange.bind(this)} />
                < /Form.Item>
                < Form.Item  >
                    < Button style = {{marginRight: '10px'}} type = "primary" htmlType = "submit" > 搜索 </Button>
                < /Form.Item>
                < Form.Item  >
                    <Button onClick = {this.handleLineAdd.bind(this)} > 添加 </Button>
                < /Form.Item>

            < /Form>
            < /div>
< Table rowSelection = {
                rowSelection
            }
            columns = {
                this.columns
            }
            dataSource = {
                this.state.list
            }
            pagination = {
                this.pagination()
            }
            bordered title = {
                this.title
            }
            footer = {
                 () => (<Button onClick={that.onFooterBack.bind(that)}>Back</Button>)
            }
            />

            < /div>
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