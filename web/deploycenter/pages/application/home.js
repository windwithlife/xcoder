import React from 'react';
import {
    Collapse,
    
    Card,
    
} from 'antd';
const { Panel } = Collapse;

import router from 'next/router';
import EditTable from '../common/components/EditableTable';
import  ApplicationModel from './models/ApplicationModel';
import BasePage from '../common/pages/BasePage';

export default class EditPage extends BasePage {
    formRef = React.createRef();
    state = {
        editMode: false,
        data:[],
        refresh:false,
    }
    constructor(props) {
        super(props);
        
        this.setDefaultModel(new ApplicationModel());
       
    }
  
    StoreData=()=>{
        return this.state.data;
    }
    changeEditMode = (event) => {
        event.stopPropagation();
       
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
            title: "应用类型",
            dataIndex: 'applicationTypeId',
            key: 'sideType'
        });
        fieldColumns.push({
            title: "基于模块",
            dataIndex: 'moduleId',
            key: 'moduleName'
        });
        fieldColumns.push({
            title: "说明",
            dataIndex: 'description',
            key: 'description'
        });

        return fieldColumns;
    }

    
    componentDidMount =() =>{
       let that = this;
       this.projectId  = this.props.router.query.projectId;
        if(this.projectId){
            this.Store().queryByProjectId(this.projectId, function (values){
                let applications =  values.data.list;
                console.log(values);
                that.setState({data:applications});
            });
        }else{
            this.Store().queryAll(function (values){
                let applications =  values.data.list;
                console.log(applications);
                that.setState({data:applications});
            });
        }
    }

   
    handleLineUpdate(index, record) {
        let path = '/application/edit';
        router.push({ pathname: path, query: { applicationId: record.id } });

    }
    handleLineDetail(record) {
        let path = '/application/detail';
        console.log(path);
        router.push({ pathname: path, query: { applicationId: record.id } });
    }
    handleLineAdd() {
        let path = '/application/add';
        console.log(path);
        router.push({ pathname: path });
    }

    handleLineDelete(index, record) {
        let that = this;
        console.log(record.id);
        this.Store().removeById(record.id).then(function(result){
            that.state.data.splice(index,1);
            that.setState({refresh:true})
        });
    }

    render() {
        let that = this;
        let items = that.StoreData();
        console.log('render module edit page');
        return (
            < div >
                <Card size="small" title="基本信息"  >
                 应用管理首页   
                </Card>
                <EditTable title="当前项目所有可发布应用：" columns={that.tableHeader()} data={items}
                    onAdd={that.handleLineAdd.bind(that)}
                    onDelete={that.handleLineDelete.bind(that)}
                    onUpdate={that.handleLineUpdate.bind(that)}
                    onDetail={that.handleLineDetail.bind(that)}
                ></EditTable>

            </div>
        );
    }
}
