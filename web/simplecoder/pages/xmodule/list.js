import React from 'react';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Card,
    Form,
    Select,
    Input
} from 'antd';

import router from 'next/router';
import { inject, observer } from 'mobx-react';
import Layout from '../common/pages/layout';
import '../common/styles/TableSearch.less';





const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
@inject('projectsStore')
@inject('modulesStore') @observer
export default class ModuleList extends React.Component{
    formRef = React.createRef();
    constructor(){
        super();
        this.startHeader();
        //this.store = this.props.modulesStore;
        
    }
    Store=()=>{
        return this.props.modulesStore;
    }
    startHeader() {
        var that = this;
        var fieldColumns=[];
        
                fieldColumns.push({
                  title: "模块名称",
                  dataIndex: 'name',
                  key: 'name'
                });
                
                fieldColumns.push({
                  title: "模块描述",
                  dataIndex: 'description',
                  key: 'description'
                });
                fieldColumns.push({
                    title: "所属项目",
                    dataIndex: 'project',
                    key: 'project'
                  });
                
                fieldColumns.push({
                  title: "状态",
                  dataIndex: 'status',
                  key: 'status'
                });
                




        this.columns = [ ...fieldColumns, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span >
                   
                    <span className = "ant-divider" />
                    <Popconfirm title = "Sure to delete?" onConfirm = {that.handleLineDelete.bind(that,index, record)} >
                        < a href = "#" > Delete </a>
                    </Popconfirm>
                    <span className = "ant-divider" />
                    <a href = "#" onClick = {that.handleLineUpdate.bind(that,index, record)} > Edit </a>
                    <span className = "ant-divider" />
                    <a href = "#" onClick = {that.handleLineDetail.bind(that,record)} > Detail </a>
                </span>
            )
        }];


    }

    onFooterBack(){

        
        router.back();
        
    }

    componentDidMount() {
        let id = this.props.query.projectId;
        this.Store().queryByProjectId(id);
        this.props.projectsStore.queryById(id,function(values){
            console.log('ok');
        });
    }

    pagination() {
        return {
            //total: this.props.modulesStore.dataObject.list.length,
            showSizeChanger: true,
        };
    }
    handleLineUpdate(index, record) {
        let that = this;
        router.push({pathname:'/xmodule/edit',query:{id:record.id}});

    }
    handleLineDetail(record) {
        let that = this;
        console.log('handle detai');
        router.push({pathname:'/xmodule/detail',query:{id:record.id}});
    }
   
    handleLineAdd() {
        let that = this;
        router.push({pathname:'/xmodule/add',query:{...that.props.query}});
    }
    handleLineDelete(index, record) {
        var that = this;
        this.props.modulesStore.removeById(index,record.id);
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
    }
    render() {
        let that = this;
        let itemData = this.props.projectsStore.dataObject.currentItem;
        return (
            <div>
            <Card size="small" title="项目" extra={<a href="#">MoreInfo</a>} style={{ width: 500 }} >
            <Form  ref={this.formRef} >
                <Form.Item   label="所属项目名称" >
                   {itemData.name}
                </Form.Item>
                <Form.Item  label="所属项目说明">
                {itemData.description}
                </Form.Item>
            </Form>
            </Card>
            
            <Form layout="inline" onSubmit = {this.handleSearch.bind(this)} >
                <Form.Item  >
                    <Input type = "text" onChange={this.handleSearchChange.bind(this)} />
                </Form.Item>
                < Form.Item  >
                    < Button style = {{marginRight: '10px'}} type = "primary" htmlType = "submit" > 搜索 </Button>
                </Form.Item>
                < Form.Item  >
                    <Button onClick = {this.handleLineAdd.bind(this)} > 添加 </Button>
                </Form.Item>

            </Form>
           
< Table rowSelection = {
                rowSelection
            }
            columns = {
                this.columns
            }
            dataSource = {
                this.props.modulesStore.dataObject.list.slice()
            }
            pagination = {
                this.pagination()
            }
            bordered title = {
                this.title
            }
            
            />

            </div>
        );
    }
}


ModuleList.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}
