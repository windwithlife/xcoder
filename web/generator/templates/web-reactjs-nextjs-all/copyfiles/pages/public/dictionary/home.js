import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Modal,
    Form,
    Card,
    Select,
    Input
} from 'antd';

import router from 'next/router';
import { inject, observer } from 'mobx-react';
import AddPage from './AddDialog.js';

const rowSelection = {
};
@inject('dictionaryStore') 
@observer
export default class DetailPage extends React.Component {
    state = {
        visible: false,
        operationTitle: "新增",
        operationType: "add",
        currentId:-1,
    }
    constructor() {
        super();
        this.startHeader();

    }
    Store(){
        return this.props.dictionarysStore;
    }
    startHeader() {
        var that = this;

        var fieldColumns = [];

        fieldColumns.push({
            title: "项显示名称",
            dataIndex: 'name',
            key: 'name'
        });

        fieldColumns.push({
            title: "项值",
            dataIndex: 'value',
            key: 'value'
        });
        fieldColumns.push({
            title: "字典分类",
            dataIndex: 'category',
            key: 'category'
        });
       

       

        this.columns = [...fieldColumns, {
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

    onFooterBack() {
        router.back();
    }
    componentDidMount() {
       
        console.log('DidMount');
       
        this.Store().queryAll();
    }

    pagination() {
        return {
         
            showSizeChanger: true
        }
    }
    handleLineUpdate(index, record) {

       
        router.push({pathname:'/public/dictionary/edit',query:{id:record.id}});
      
       
    }
    handleLineDetail(record) {
        //router.push({ pathname: '/zxtable/detail', query: { ...that.props.query, pxtableId: record.id } });
    }
    handleLineAdd() {
        this.setState({ visible: true ,operationType: "add"});
    }
    onModalConfirm() {
        this.setState({ visible: false });
    }
    handleLineDelete(index, record) {
        console.log(record.id);
        this.Store().removeById(index,record.id);
    }

    handleSearchChange(e) {
        this.setState({ searchText: e.target.value, name: e.target.value });
    }
    handleSearch(e) {
        e.preventDefault();
        let keywork = this.state.searchText
        //this.props.tablesStore.fetchByNameLike(param.keyword);

    }
    render() {
        let that = this;
        //let itemData = that.props.projectsStore.dataObject.currentItem;
        ///let editUrl = "/xproject/edit?id=" + this.props.query.id;
        return ( 
            < div >
                <Modal visible={that.state.visible} title={that.state.operationTitle}
                    onCancel={this.onModalConfirm.bind(that)}
                    footer={[]}>
                    <AddPage   onConfirm={this.onModalConfirm.bind(that)}></AddPage>
                </Modal>

                <div>
                <Card size="small" title="功能信息" style={{ width: 500 }} >
                               
               </Card>
                </div>

                < Table rowSelection={
                    rowSelection
                }
                    columns={
                        this.columns
                    }
                    dataSource={
                        //that.props.tablesStore.items.slice()
                        that.Store().dataObject.list.slice()
                    }
                    pagination={
                        this.pagination()
                    }
                    bordered title={() => (<Form layout="inline" onSubmit={this.handleSearch.bind(this)} >

                        < Form.Item label="分类信息：">
                            <Button onClick={this.handleLineAdd.bind(this)} > 添加 </Button>
                        </Form.Item>
                    </Form>)}
                    
                />

            </div>
        );
    }
}

DetailPage.getInitialProps = async function (context) {
    return { query: context.query};
}
