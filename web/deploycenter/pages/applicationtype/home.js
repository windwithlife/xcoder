import React from 'react';
import {
    Collapse,
 
 
    Input,
    Card,
 
} from 'antd';
const { Panel } = Collapse;

import router from 'next/router';

import EditTable from '../common/components/EditableTable';
import BasePage from '../common/pages/BasePage';
import ApplicationTypeModel from './models/ApplicationTypeModel';


export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        editMode: false,
        data:[],
    }
    constructor() {
        super();
        this.setDefaultModel(new ApplicationTypeModel());
    }
  
    StoreData=()=>{
        return this.state.data;
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({ editMode: nextMode });
    }
    tableHeader() {
        var that = this;

        var fieldColumns = [];

        fieldColumns.push({
            title: "名称",
            dataIndex: 'name',
            key: 'name'
        });

        fieldColumns.push({
            title: "说明",
            dataIndex: 'description',
            key: 'description'
        });

        return fieldColumns;
    }

    
    componentDidMount() {
        let that = this;
        this.Store().queryAll(function (values) {
            console.log(values);
            that.setState({data:values.data.list});
        });
    }

  

    handleLineUpdate(index, record) {
        
        let path = '/applicationtype/edit';
        router.push({ pathname: path, query: { id: record.id } });

    }
    handleLineDetail(record) {
        let path = '/applicationtype/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd() {
        let path = '/applicationtype/add';
        console.log(path);
        router.push({ pathname: path });
    }

    handleLineDelete(index, record) {
        let id = record.id;
        this.Store().removeById(index, record.id, function (value) {
           console.log('sucessful to detele one xrlease');
        });
    }

    render() {
        let that = this;
        let items = that.StoreData();
    
        console.log('render module edit page');
        return (
            < div >
                <Card size="small" title="基本信息" style={{ width: 500 }}  >
                 发布系统首页   
                </Card>
                <EditTable title="应用类型：" columns={that.tableHeader()} data={items}
                    onAdd={that.handleLineAdd.bind(that)}
                    onDelete={that.handleLineDelete.bind(that)}
                    onUpdate={that.handleLineUpdate.bind(that)}
                    onDetail={that.handleLineDetail.bind(that)}
                ></EditTable>

            </div>
        );
    }
}
