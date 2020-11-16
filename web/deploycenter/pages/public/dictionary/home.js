import React from 'react';

import {
    Modal,
    Form,
    Card,
    Table,
    Button,
    Popconfirm
} from 'antd';

import router from 'next/router';
import BasePage from '../../common/pages/BasePage';
import DictionaryModel from './models/DictionaryModel';


export default class EditPage extends BasePage {
    formRef = React.createRef();
 
    state = {
        visible: false,
        operationTitle: "新增",
        operationType: "add",
        editMode: false,
        data:[],
    }
    constructor() {
        super();
        this.startHeader();
        this.setDefaultModel(new DictionaryModel())

    }
    StoreData=()=>{
        return this.state.data;
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
        let that = this;
        this.Store().queryAll().then(function(result){
            if(result.data){
                that.setState({data:result.data.list})
            }
        });
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
        let that = this;
        console.log(record.id);
        this.Store().removeById(record.id).then(function(result){
            that.state.data.splice(index,1);
        });
    }

    render() {
        let that = this;
        let Items = this.StoreData();
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
                        Items
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
