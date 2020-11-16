import React from 'react';
import {
    Collapse,
    Modal,
    Form,
    Input,
    Card,
    Select,
    Button,
} from 'antd';
const { Panel } = Collapse;

import router from 'next/router';
import EditTable from '../common/components/EditableTable';
import  ApplicationModel from './models/DeploymentConfigModel';

export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        editMode: false,
        dataObject:[],
    }
    constructor(props) {
        super(props);
        this.model = new ApplicationModel();
       
    }
    Store = () => {
        return this.model;
    }
    StoreData=()=>{
        return this.state.dataObject;
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        // this.setState({ editMode: nextMode });
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
                that.setState({dataObject:applications});
            });
        }else{
            this.Store().queryAll(function (values){
                let applications =  values.data.list;
                console.log(applications);
                that.setState({dataObject:applications});
            });
        }
    }

   
    handleLineUpdate(index, record) {
        let path = '/application/edit';
        router.push({ pathname: path, query: { id: record.id } });

    }
    handleLineDetail(record) {
        let path = '/application/detail';
        console.log(path);
        router.push({ pathname: path, query: { id: record.id } });
    }
    handleLineAdd() {
        let path = '/application/add';
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
                <Card size="small" title="基本信息" style={{ width: 800 }}  >
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

EditPage.getInitialProps = async function (context) {
    return { query: context.query };
}
